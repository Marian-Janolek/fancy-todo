-- CreateTable
CREATE TABLE "TaskState" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stateName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "stateId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "Task_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "TaskState" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "TaskState_stateName_key" ON "TaskState"("stateName");
