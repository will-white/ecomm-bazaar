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
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_profile" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"dob" date NOT NULL,
	"country" varchar(320) NOT NULL,
	"language" varchar(48)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
