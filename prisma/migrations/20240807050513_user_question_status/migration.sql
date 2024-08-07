-- CreateTable
CREATE TABLE "UserQuestionStatus" (
    "id" UUID NOT NULL,
    "userID" UUID NOT NULL,
    "listID" UUID NOT NULL,
    "questionID" UUID NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "important" BOOLEAN NOT NULL DEFAULT false,
    "review" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "createdById" UUID NOT NULL,
    "updatedById" UUID NOT NULL,

    CONSTRAINT "UserQuestionStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserQuestionStatus_userID_listID_questionID_key" ON "UserQuestionStatus"("userID", "listID", "questionID");

-- AddForeignKey
ALTER TABLE "UserQuestionStatus" ADD CONSTRAINT "UserQuestionStatus_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuestionStatus" ADD CONSTRAINT "UserQuestionStatus_listID_fkey" FOREIGN KEY ("listID") REFERENCES "List"("listID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuestionStatus" ADD CONSTRAINT "UserQuestionStatus_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "Question"("questionID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuestionStatus" ADD CONSTRAINT "UserQuestionStatus_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuestionStatus" ADD CONSTRAINT "UserQuestionStatus_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
