# Migration `20200504234612-data-structure`

This migration has been generated by ignatif at 5/4/2020, 11:46:12 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
    "id" SERIAL,
    "name" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Post" (
    "authorId" integer   ,
    "content" text   ,
    "id" SERIAL,
    "title" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE UNIQUE INDEX "User.name" ON "public"."User"("name")

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE SET NULL  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200504234612-data-structure
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,22 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url      = "postgres://rimhyfwhshaoij:a8c12a9d34d2222b8a09de6ec07ba6338f7c7620e3632449655088bc794f1a30@ec2-18-206-84-251.compute-1.amazonaws.com:5432/d45kjhmrotg8tr"
+}
+
+model User {
+  id    Int     @default(autoincrement()) @id
+  name  String  @unique
+  posts Post[]
+}
+
+model Post {
+  content   String?
+  id        Int     @default(autoincrement()) @id
+  title     String
+  author    User?   @relation(fields: [authorId], references: [id])
+  authorId  Int?
+}
```

