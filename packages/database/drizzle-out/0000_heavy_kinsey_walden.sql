CREATE TABLE "visitor_comments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content" text NOT NULL,
	"timestamp" integer DEFAULT extract(epoch from now()) NOT NULL,
	"name" text NOT NULL
);
