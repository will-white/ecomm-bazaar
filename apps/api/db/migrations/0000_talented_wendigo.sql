CREATE TABLE `user` (
	`id` varchar(48) NOT NULL DEFAULT (UUID()),
	`email` varchar(320) NOT NULL,
	`password` binary(60) NOT NULL,
	`first_name` varchar(48),
	`last_name` varchar(48),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`created_by` varchar(48),
	`modified_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`modified_by` varchar(48),
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
