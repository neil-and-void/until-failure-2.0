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
	`notes` text NOT NULL,
	`workout_id` text NOT NULL,
	`exercise_routine_id` text NOT NULL,
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
	`weight` real,
	`reps` integer,
	`seconds` integer,
	`set_type` text DEFAULT 'WORKING' NOT NULL,
	`measurement` text DEFAULT 'WORKING' NOT NULL,
	`exercise_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `set_schemes` (
	`id` text PRIMARY KEY NOT NULL,
	`target_reps` integer,
	`target_duration` integer,
	`set_type` text DEFAULT 'WORKING' NOT NULL,
	`measurement` text DEFAULT 'WEIGHT' NOT NULL,
	`exercise_routine_id` text NOT NULL,
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
	`routine_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	FOREIGN KEY (`routine_id`) REFERENCES `routines`(`id`) ON UPDATE no action ON DELETE no action
);
