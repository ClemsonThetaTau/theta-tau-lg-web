import { auth } from "@/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

async function signIn(email: string, password: string) {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

// People are added, no one can signup
// async function signUp(email: string, password: string) {
//     let result = null,
//         error = null;
//     try {
//         result = await createUserWithEmailAndPassword(auth, email, password);
//     } catch (e) {
//         error = e;
//     }

//     return { result, error };
// }

export { signIn };
