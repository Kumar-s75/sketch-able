-- Add room privacy fields required by backend create/join flows.
ALTER TABLE "Room"
ADD COLUMN IF NOT EXISTS "isPrivate" BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE "Room"
ADD COLUMN IF NOT EXISTS "inviteCode" TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS "Room_inviteCode_key" ON "Room"("inviteCode");
