import { ErrorMessage } from '@hookform/error-message'
import { useForm } from 'react-hook-form'
import './App.css'
import { usePostComment } from './features/visitorComment/mutation'
import { useVisitorComments } from './features/visitorComment/query'

function App() {
    const { data: comments, isLoading } = useVisitorComments()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<{
        name: string
        content: string
    }>()
    const { mutate, isPending } = usePostComment()

    const onSubmit = (data: { name: string; content: string }) => {
        mutate(data, {
            onSuccess: () => reset(),
        })
    }

    if (isLoading) return <div style={styles.loading}>Loading comments...</div>

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Visitor Comments</h1>

            <div style={styles.commentsSection}>
                {comments?.map((comment) => (
                    <div key={comment.id} style={styles.commentCard}>
                        <h3 style={styles.commentAuthor}>{comment.name}</h3>
                        <p style={styles.commentContent}>{comment.content}</p>
                        <time style={styles.commentDate}>
                            {new Date(
                                comment.timestamp * 1000
                            ).toLocaleDateString()}
                        </time>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
                <div style={styles.formGroup}>
                    <input
                        {...register('name', { required: 'Name is required' })}
                        placeholder="Your name"
                        style={styles.input}
                        disabled={isPending}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="name"
                        render={({ message }) => (
                            <span style={styles.error}>{message}</span>
                        )}
                    />
                </div>

                <div style={styles.formGroup}>
                    <textarea
                        {...register('content', {
                            required: 'Comment is required',
                        })}
                        placeholder="Your comment"
                        style={{ ...styles.input, ...styles.textarea }}
                        disabled={isPending}
                        rows={4}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="content"
                        render={({ message }) => (
                            <span style={styles.error}>{message}</span>
                        )}
                    />
                </div>

                <button
                    type="submit"
                    style={styles.button}
                    disabled={isPending}
                >
                    {isPending ? 'Submitting...' : 'Post Comment'}
                </button>
            </form>
        </div>
    )
}

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
    },
    heading: {
        fontSize: '2.5rem',
        marginBottom: '2rem',
        color: '#333',
    },
    commentsSection: {
        marginBottom: '3rem',
    },
    commentCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '1rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    commentAuthor: {
        margin: '0 0 0.5rem',
        color: '#2c3e50',
        fontSize: '1.1rem',
    },
    commentContent: {
        margin: '0 0 0.5rem',
        color: '#34495e',
        lineHeight: 1.6,
    },
    commentDate: {
        fontSize: '0.9rem',
        color: '#7f8c8d',
    },
    form: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    formGroup: {
        marginBottom: '1.5rem',
    },
    input: {
        width: '100%',
        padding: '0.8rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '1rem',
        marginBottom: '0.5rem',
    },
    textarea: {
        resize: 'vertical' as const,
    },
    button: {
        backgroundColor: '#646cff',
        color: 'white',
        padding: '0.8rem 1.5rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'background-color 0.2s',
    },
    error: {
        color: '#e74c3c',
        fontSize: '0.9rem',
    },
    loading: {
        textAlign: 'center' as const,
        padding: '2rem',
        fontSize: '1.2rem',
        color: '#666',
    },
}

export default App
