CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`full_name` text NOT NULL,
	`age` integer NOT NULL,
	`country` text NOT NULL,
	`interests` text NOT NULL
);
