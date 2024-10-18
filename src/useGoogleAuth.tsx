// import { useState, useEffect } from 'react'
// import { initializeApp } from 'firebase/app'
// import { 
//   getAuth, 
//   signInWithRedirect, 
//   GoogleAuthProvider, 
//   getRedirectResult, 
//   signOut as firebaseSignOut,
//   User
// } from 'firebase/auth'

// // Your Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID
// }

// // Initialize Firebase
// const app = initializeApp(firebaseConfig)
// const auth = getAuth(app)
// const provider = new GoogleAuthProvider()

// export function useGoogleAuth() {
//   const [user, setUser] = useState<User | null>(null)
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     const checkRedirectResult = async () => {
//       try {
//         const result = await getRedirectResult(auth)
//         if (result) {
//           setUser(result.user)
//         }
//       } catch (error) {
//         console.error("Error getting redirect result", error)
//       }
//     }

//     checkRedirectResult()

//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user)
//     })

//     return () => unsubscribe()
//   }, [])

//   const signIn = () => {
//     setLoading(true)
//     const newWindow = window.open('', '_blank')
//     if (newWindow) {
//       newWindow.document.write('Loading...')
//       signInWithRedirect(auth, provider)
//         .then(() => {
//           newWindow.close()
//         })
//         .catch((error) => {
//           console.error("Error initiating sign-in", error)
//           newWindow.close()
//         })
//         .finally(() => {
//           setLoading(false)
//         })
//     }
//   }

//   const signOut = async () => {
//     setLoading(true)
//     try {
//       await firebaseSignOut(auth)
//     } catch (error) {
//       console.error("Error signing out", error)
//     }
//     setLoading(false)
//   }

//   return { user, loading, signIn, signOut }
// }