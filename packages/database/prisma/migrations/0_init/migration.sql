-- CreateEnum
CREATE TYPE "Status" AS ENUM ('InProgress', 'CompleteMaintained', 'CompleteUnmaintained', 'Planned');

-- CreateEnum
CREATE TYPE "BackgroundQuality" AS ENUM ('low', 'med', 'high');

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "description" TEXT,
    "overviewText" TEXT,
    "overviewImage1" TEXT,
    "overviewImage2" TEXT,
    "overviewImage3" TEXT,
    "link" TEXT,
    "gitHubLink" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BackgroundPack" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "entryUrl" TEXT NOT NULL,
    "manifestUrl" TEXT NOT NULL,
    "previewUrl" TEXT,
    "interactive" BOOLEAN NOT NULL DEFAULT false,
    "allowExternal" BOOLEAN NOT NULL DEFAULT false,
    "manifest" JSONB NOT NULL,
    "uploadedBlobUrls" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BackgroundPack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" SERIAL NOT NULL,
    "enableBackground" BOOLEAN NOT NULL DEFAULT true,
    "enableChatbot" BOOLEAN NOT NULL DEFAULT false,
    "enableContactForm" BOOLEAN NOT NULL DEFAULT false,
    "activeBackgroundPackId" TEXT,
    "backgroundConfig" JSONB NOT NULL DEFAULT '{}',
    "backgroundQuality" TEXT NOT NULL DEFAULT 'med',
    "reducedMotionOverride" BOOLEAN,
    "siteTitle" TEXT NOT NULL DEFAULT 'Portfolio',
    "tagline" TEXT NOT NULL DEFAULT '',
    "aboutContent" TEXT NOT NULL DEFAULT '',
    "avatarImageUrl" TEXT,
    "logoImageUrl" TEXT,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SiteSettings" ADD CONSTRAINT "SiteSettings_activeBackgroundPackId_fkey" FOREIGN KEY ("activeBackgroundPackId") REFERENCES "BackgroundPack"("id") ON DELETE SET NULL ON UPDATE CASCADE;
