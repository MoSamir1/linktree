import { fireApp } from "@/important/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { testForActiveSession } from "./testForActiveSession";

export async function updateLinks(array) {
    const username = testForActiveSession();
    if (username) {
        try {
            const AccountDocRef = collection(fireApp, "AccountData");
            const docRef = doc(AccountDocRef, `${username}`);
            const docSnap = await getDoc(docRef);

            let previousData = {};

            if (docSnap.exists()) {
                previousData = docSnap.data();
            }

            await setDoc(docRef, {...previousData, links: array});
        } catch (error) {
            throw new Error(error);
        }
    }
}