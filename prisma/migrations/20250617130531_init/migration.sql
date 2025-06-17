-- CreateTable
CREATE TABLE "programs" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "slug" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "platform" TEXT,
    "author" TEXT,
    "description" TEXT NOT NULL,
    "language" VARCHAR NOT NULL,
    "type" TEXT NOT NULL,
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "episodes" (
    "id" UUID NOT NULL,
    "media_url" TEXT NOT NULL,
    "thumbnail_url" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "episode_number" INTEGER NOT NULL,
    "duration" INTEGER,
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "program_id" UUID NOT NULL,

    CONSTRAINT "episodes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "programs_slug_key" ON "programs"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "episodes_episode_number_program_id_key" ON "episodes"("episode_number", "program_id");

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
