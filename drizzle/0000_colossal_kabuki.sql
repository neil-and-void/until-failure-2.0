CREATE TABLE `exercise_routines` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`active` integer NOT NULL,
	`routine_id` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	FOREIGN KEY (`routine_id`) REFERENCES `routines`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `exercises` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`notes` text,
	`routine_id` integer,
	`exercise_routine_id` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	FOREIGN KEY (`routine_id`) REFERENCES `routines`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`exercise_routine_id`) REFERENCES `exercise_routines`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `routines` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`active` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer
);
--> statement-breakpoint
CREATE TABLE `set_entries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`weight` integer,
	`reps` integer,
	`seconds` integer,
	`set_type` text DEFAULT 'WORKING' NOT NULL,
	`measurement` text DEFAULT 'WORKING' NOT NULL,
	`exercise_id` integer,
	`set_scheme_id` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`set_scheme_id`) REFERENCES `set_schemes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `set_schemes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`target_reps` integer DEFAULT 0 NOT NULL,
	`target_duration` integer DEFAULT 0 NOT NULL,
	`set_type` integer DEFAULT 'WORKING' NOT NULL,
	`measurement` integer DEFAULT 'WEIGHT' NOT NULL,
	`exercise_routine_id` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	FOREIGN KEY (`exercise_routine_id`) REFERENCES `exercise_routines`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `workouts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`start` integer NOT NULL,
	`end` integer,
	`routine_id` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	FOREIGN KEY (`routine_id`) REFERENCES `routines`(`id`) ON UPDATE no action ON DELETE no action
);
