-- CreateTable
CREATE TABLE "List" (
    "listID" UUID NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "visibility" INTEGER NOT NULL,
    "tags" JSON,
    "isDeleted" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "userID" UUID NOT NULL,

    CONSTRAINT "List_pkey" PRIMARY KEY ("listID")
);

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
