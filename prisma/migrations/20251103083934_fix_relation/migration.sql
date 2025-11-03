-- CreateEnum
CREATE TYPE "CodeType" AS ENUM ('COMMON', 'UNIQUE');

-- CreateEnum
CREATE TYPE "CodeStatus" AS ENUM ('ACTIVE', 'expired');

-- CreateTable
CREATE TABLE "RedeemCode" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "type" "CodeType" NOT NULL,
    "redemptionLimit" INTEGER,
    "redeemedCount" INTEGER NOT NULL DEFAULT 0,
    "expiryAt" TIMESTAMP(3) NOT NULL,
    "status" "CodeStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RedeemCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Redemption" (
    "id" SERIAL NOT NULL,
    "codeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "redeemedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Redemption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RedeemCode_code_key" ON "RedeemCode"("code");

-- AddForeignKey
ALTER TABLE "Redemption" ADD CONSTRAINT "Redemption_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "RedeemCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Redemption" ADD CONSTRAINT "Redemption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
