/*
  Warnings:

  - You are about to alter the column `amount` on the `expenses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to alter the column `amount` on the `incomes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.

*/
-- AlterTable
ALTER TABLE `expenses` MODIFY `amount` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `incomes` MODIFY `amount` INTEGER NOT NULL;
