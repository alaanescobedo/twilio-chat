import type { User as UserSupabase } from '@supabase/gotrue-js/src/lib/types';
import type { User as UserTwilio } from "@twilio/conversations";

interface UserApp {
  id: string
  identity: string;
  friendlyName: string | null;
  attributes: {
    avatar?: string
    description?: string
  },
  conversationsSid: string[]
  serviceSid: string
  isOnline?: boolean | null,
  isNotificable?: boolean | null;
}

export type { UserSupabase, UserTwilio, UserApp };

