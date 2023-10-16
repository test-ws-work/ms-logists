-- CreateTable
CREATE TABLE "logists" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "storeId" INTEGER NOT NULL,

    CONSTRAINT "logists_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "logists_email_key" ON "logists"("email");
