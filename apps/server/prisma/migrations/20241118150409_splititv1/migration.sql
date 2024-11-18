-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "access" TEXT[],

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "account" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,
    "type" TEXT[],
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "invoiceId" INTEGER NOT NULL,
    "debtorId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Debtor" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Debtor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LineItem" (
    "id" SERIAL NOT NULL,
    "productCode" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "pricePerUnit" DOUBLE PRECISION NOT NULL,
    "invoiceId" INTEGER,

    CONSTRAINT "LineItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "prodName" TEXT NOT NULL,
    "prodDescription" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LineItemProduct" (
    "lineItemId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "LineItemProduct_pkey" PRIMARY KEY ("lineItemId","productId")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "tagName" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceTag" (
    "invoiceId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "InvoiceTag_pkey" PRIMARY KEY ("invoiceId","tagId")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "invoiceId" INTEGER NOT NULL,
    "debtorId" INTEGER[],
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "cyclePeriod" INTEGER NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InvoiceDebtors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_role_key" ON "Role"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_account_key" ON "Customer"("account");

-- CreateIndex
CREATE INDEX "Customer_userId_idx" ON "Customer"("userId");

-- CreateIndex
CREATE INDEX "Invoice_customerId_idx" ON "Invoice"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "_InvoiceDebtors_AB_unique" ON "_InvoiceDebtors"("A", "B");

-- CreateIndex
CREATE INDEX "_InvoiceDebtors_B_index" ON "_InvoiceDebtors"("B");

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_debtorId_fkey" FOREIGN KEY ("debtorId") REFERENCES "Debtor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Debtor" ADD CONSTRAINT "Debtor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineItem" ADD CONSTRAINT "LineItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineItemProduct" ADD CONSTRAINT "LineItemProduct_lineItemId_fkey" FOREIGN KEY ("lineItemId") REFERENCES "LineItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineItemProduct" ADD CONSTRAINT "LineItemProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceTag" ADD CONSTRAINT "InvoiceTag_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceTag" ADD CONSTRAINT "InvoiceTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceDebtors" ADD CONSTRAINT "_InvoiceDebtors_A_fkey" FOREIGN KEY ("A") REFERENCES "Debtor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceDebtors" ADD CONSTRAINT "_InvoiceDebtors_B_fkey" FOREIGN KEY ("B") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
