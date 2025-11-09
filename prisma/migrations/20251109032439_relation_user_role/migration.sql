/*
  Warnings:

  - Added the required column `RoleId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `RoleId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_RoleId_fkey` FOREIGN KEY (`RoleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
