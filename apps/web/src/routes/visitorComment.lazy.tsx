import { ErrorMessage } from '@hookform/error-message'
import { createLazyFileRoute } from '@tanstack/react-router'
import { type CreateVisitorComment as CreateVisitorCommentType } from 'database'
import { useForm } from 'react-hook-form'
import { useVisitorCommentMutation } from '../features/VisitorComment/hooks/useVisitorCommentMutation'
import { useVisitorComments } from '../features/VisitorComment/hooks/useVisitorComments'

export const Route = createLazyFileRoute('/visitorComment')({
    component: VisitorComment,
})

function VisitorComment() {
    const { data: comments, isLoading } = useVisitorComments()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateVisitorCommentType>()
    const { mutate, isPending } = useVisitorCommentMutation()

    const onSubmit = (data: CreateVisitorCommentType) => {
        mutate(data, {
            onSuccess: () => reset(),
        })
    }

    if (isLoading)
        return (
            <div className="text-center p-8 text-lg text-gray-600">
                Loading comments...
            </div>
        )

    return (
        <div className="max-w-3xl mx-auto p-8 font-sans">
            <h1 className="text-4xl mb-8 text-gray-800">Visitor Comments</h1>

            <div className="mb-12">
                {comments?.map((comment) => (
                    <div
                        key={comment.id}
                        className="bg-gray-50 rounded-lg p-6 mb-4 shadow-sm"
                    >
                        <h3 className="m-0 mb-2 text-gray-700 text-lg">
                            {comment.name}
                        </h3>
                        <p className="m-0 mb-2 text-gray-700 leading-relaxed">
                            {comment.content}
                        </p>
                        <time className="text-sm text-gray-500">
                            {new Date(
                                comment.timestamp * 1000
                            ).toLocaleDateString()}
                        </time>
                    </div>
                ))}
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-lg shadow-sm"
            >
                <div className="mb-6">
                    <input
                        {...register('name', { required: 'Name is required' })}
                        placeholder="Your name"
                        className="w-full p-3 border border-gray-200 rounded-md text-base mb-2"
                        disabled={isPending}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="name"
                        render={({ message }) => (
                            <span className="text-red-500 text-sm">
                                {message}
                            </span>
                        )}
                    />
                </div>

                <div className="mb-6">
                    <textarea
                        {...register('content', {
                            required: 'Comment is required',
                        })}
                        placeholder="Your comment"
                        className="w-full p-3 border border-gray-200 rounded-md text-base mb-2 resize-y"
                        disabled={isPending}
                        rows={4}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="content"
                        render={({ message }) => (
                            <span className="text-red-500 text-sm">
                                {message}
                            </span>
                        )}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-indigo-500 text-white px-6 py-3 rounded-md cursor-pointer text-base transition-colors hover:bg-indigo-600 disabled:opacity-50"
                    disabled={isPending}
                >
                    {isPending ? 'Submitting...' : 'Post Comment'}
                </button>
            </form>
        </div>
    )
}
