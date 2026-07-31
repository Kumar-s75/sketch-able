"use client";
import { useEffect, useState } from "react";
import { getPublicWsUrl } from "@/lib/public-urls";
import { safeStorageGet } from "@/lib/storage";

export const useSocket = (roomId: string | null, inviteCode?: string | null) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!roomId) return;

    const token = safeStorageGet("token");
    if (!token) return;

    const ws = new WebSocket(`${getPublicWsUrl()}/?token=${token}`);

    ws.onopen = () => {
      setSocket(ws);
      const storedInvite = inviteCode ?? safeStorageGet(`drawr:invite:${roomId}`) ?? "";
      const data = JSON.stringify({
        type: "join_room",
        roomId,
        invite: storedInvite,
      });
      ws.send(data);
    };

    ws.onerror = () => {
      setSocket(null);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            type: "leave_room",
            roomId,
          })
        );
        ws.close();
      }
    };
  }, [roomId, inviteCode]);

  return socket;
};
