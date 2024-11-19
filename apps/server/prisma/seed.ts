import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create Roles
  const adminRole = await prisma.role.create({
    data: {
      role: "admin",
      access: ["read", "write", "delete"],
    },
  });

  const userRole = await prisma.role.create({
    data: {
      role: "user",
      access: ["read", "write"],
    },
  });

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      username: "johndoe",
      email: "john.doe@example.com",
      password: "securepassword123",
      account: "acct_123",
      registered: true,
      roles: {
        create: [{ roleId: adminRole.id }],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "janedoe",
      email: "jane.doe@example.com",
      password: "anothersecurepassword",
      account: "acct_456",
      registered: true,
      roles: {
        create: [{ roleId: userRole.id }],
      },
    },
  });

  // Create Customers
  const customer1 = await prisma.customer.create({
    data: {
      userId: user1.id,
      account: 12345,
      firstName: "Alice",
      lastName: "Smith",
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      userId: user2.id,
      account: 67890,
      firstName: "Bob",
      lastName: "Johnson",
    },
  });

  // Create Tags
  const tag1 = await prisma.tag.create({ data: { tagName: "Urgent" } });
  const tag2 = await prisma.tag.create({ data: { tagName: "Recurring" } });

  // Create Products
  const product1 = await prisma.product.create({
    data: {
      prodName: "Product A",
      prodDescription: "Description for Product A",
    },
  });

  const product2 = await prisma.product.create({
    data: {
      prodName: "Product B",
      prodDescription: "Description for Product B",
    },
  });

  // Create Invoices
  const invoice1 = await prisma.invoice.create({
    data: {
      customerId: customer1.id,
      creationDate: new Date(),
      type: ["standard"],
      name: "Invoice 001",
      description: "Monthly service invoice",
      totalAmount: 25000,
      tags: {
        create: [{ tagId: tag1.id }],
      },
      lineItems: {
        create: [
          {
            productCode: "PROD001",
            quantity: 2,
            pricePerUnit: 125.0,
            products: {
              create: [{ productId: product1.id }],
            },
          },
        ],
      },
    },
  });

  const invoice2 = await prisma.invoice.create({
    data: {
      customerId: customer2.id,
      creationDate: new Date(),
      type: ["recurring"],
      name: "Invoice 002",
      description: "Quarterly service invoice",
      totalAmount: 50000,
      tags: {
        create: [{ tagId: tag2.id }],
      },
      lineItems: {
        create: [
          {
            productCode: "PROD002",
            quantity: 5,
            pricePerUnit: 100.0,
            products: {
              create: [{ productId: product2.id }],
            },
          },
        ],
      },
    },
  });

  // Create Debtors
  const debtor1 = await prisma.debtor.create({
    data: {
      userId: user1.id,
      name: "Charlie",
      invoices: {
        connect: [{ id: invoice1.id }],
      },
    },
  });

  const debtor2 = await prisma.debtor.create({
    data: {
      userId: user2.id,
      name: "Diana",
      invoices: {
        connect: [{ id: invoice2.id }],
      },
    },
  });

  // Create Payments
  await prisma.payment.create({
    data: {
      invoiceId: invoice1.id,
      debtorId: debtor1.id,
      status: true,
    },
  });

  await prisma.payment.create({
    data: {
      invoiceId: invoice2.id,
      debtorId: debtor2.id,
      status: false,
    },
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
