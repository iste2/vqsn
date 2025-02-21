"use server";
import {adminDb} from "@/lib/firebase/admin-config";
import {waitlistCollectionName} from "@/lib/firebase/collection-names";
import {FieldValue} from "firebase-admin/firestore";

export interface createWaitlistEntryResponse {
    success: boolean;
    message?: string;
}

export async function createWaitlistEntry(email: string): Promise<createWaitlistEntryResponse> {
    try {
        
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email address');

        const waitlistRef = adminDb.collection(waitlistCollectionName)
        await waitlistRef.add({
            email,
            timestamp: FieldValue.serverTimestamp(),
        })

        return {
            success: true,
            message: 'Successfully joined waitlist'
        }
    } catch (error) {
        console.error('Waitlist submission error:', error);
        throw error;
    }
}