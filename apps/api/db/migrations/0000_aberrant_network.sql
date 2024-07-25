CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(320) NOT NULL,
	"password" "bytea" NOT NULL,
	"first_name" varchar(48),
	"last_name" varchar(48),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" varchar(48),
	"modified_at" timestamp DEFAULT now() NOT NULL,
	"modified_by" varchar(48)
);
