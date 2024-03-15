CREATE TABLE `exercise_routines` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`active` integer NOT NULL,
	`routine_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	FOREIGN KEY (`routine_id`) REFERENCES `routines`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `exercises` (
	`id` text PRIMARY KEY NOT NULL,
	`notes` text,
	`workout_id` text,
	`exercise_routine_id` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	FOREIGN KEY (`workout_id`) REFERENCES `workouts`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`exercise_routine_id`) REFERENCES `exercise_routines`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `routines` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`active` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer
);
--> statement-breakpoint
CREATE TABLE `set_entries` (
	`id` text PRIMARY KEY NOT NULL,
	`weight` integer,
	`reps` integer,
	`seconds` integer,
	`set_type` text DEFAULT 'WORKING' NOT NULL,
	`measurement` text DEFAULT 'WORKING' NOT NULL,
	`exercise_id` text,
	`set_scheme_id` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`set_scheme_id`) REFERENCES `set_schemes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `set_schemes` (
	`id` text PRIMARY KEY NOT NULL,
	`target_reps` integer DEFAULT 0 NOT NULL,
	`target_duration` integer DEFAULT 0 NOT NULL,
	`set_type` text DEFAULT 'WORKING' NOT NULL,
	`measurement` text DEFAULT 'WEIGHT' NOT NULL,
	`exercise_routine_id` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	FOREIGN KEY (`exercise_routine_id`) REFERENCES `exercise_routines`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `workouts` (
	`id` text PRIMARY KEY NOT NULL,
	`start` integer NOT NULL,
	`end` integer,
	`routine_id` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	FOREIGN KEY (`routine_id`) REFERENCES `routines`(`id`) ON UPDATE no action ON DELETE no action
);
