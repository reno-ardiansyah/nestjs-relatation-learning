-- CreateTable
CREATE TABLE "Peoples" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dob" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Peoples_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhoneNumbers" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "people_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PhoneNumbers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdCard" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "people_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IdCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HobbiesOnPeoples" (
    "hobbie_id" INTEGER NOT NULL,
    "people_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HobbiesOnPeoples_pkey" PRIMARY KEY ("hobbie_id","people_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IdCard_people_id_key" ON "IdCard"("people_id");

-- AddForeignKey
ALTER TABLE "PhoneNumbers" ADD CONSTRAINT "PhoneNumbers_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "Peoples"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdCard" ADD CONSTRAINT "IdCard_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "Peoples"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HobbiesOnPeoples" ADD CONSTRAINT "HobbiesOnPeoples_hobbie_id_fkey" FOREIGN KEY ("hobbie_id") REFERENCES "Hobbies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HobbiesOnPeoples" ADD CONSTRAINT "HobbiesOnPeoples_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "Peoples"("id") ON DELETE CASCADE ON UPDATE CASCADE;
