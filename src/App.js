import React, { useState, useEffect } from "react"
import { db } from "./firebase-config"
import {
  setDoc,
  doc,
  arrayUnion,
  getDoc,
  Timestamp,
  onSnapshot
} from "firebase/firestore"
import Book from "./Book"
import "./css/app.css"

function App({ uid }) {
  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [userInfo, setUserInfo] = useState([])

  useEffect(() => {
    onSnapshot(doc(db, "users", uid), (doc) => {
      setUserInfo(doc.data().bookList)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addBook = async () => {
    if (uid) {
      const ref = doc(db, "users", uid)
      const time = Timestamp.now()
      const timeKey = time.seconds + time.nanoseconds

      await setDoc(
        ref,
        {
          bookList: arrayUnion({
            timeCreated: time,
            timeKey: timeKey,
            title: newTitle,
            author: newAuthor
          })
        },
        { merge: true }
      )
    }
  }

  const retrieveBooks = async () => {
    const ref = doc(db, "users", uid)
    const snapShot = await getDoc(ref)

    if (snapShot.exists()) {
      setUserInfo(snapShot.data().bookList)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!")
    }
  }

  const deleteData = async (key) => {
    const currArr = userInfo
    const bookList = currArr.filter((book) => book.timeKey !== key)

    const ref = doc(db, "users", uid)

    await setDoc(ref, { bookList })
  }

  const updateData = async (t, a, key) => {
    const bookList = userInfo

    for (let i = 0; i < bookList.length; i++) {
      if (bookList[i].timeKey === key) {
        bookList[i].title = t
        bookList[i].author = a
      }
    }
    const ref = doc(db, "users", uid)
    await setDoc(ref, { bookList })
  }

  useEffect(() => {
    if (uid) {
      retrieveBooks()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])

  return (
    <div className="App">
      <div className="input-wrapper">
        <input
          className="app-title-input"
          placeholder="Title..."
          onChange={(e) => {
            setNewTitle(e.target.value)
          }}
        />

        <input
          className="app-author-input"
          placeholder="Author..."
          onChange={(e) => {
            setNewAuthor(e.target.value)
          }}
        />
        <button className="add-book-btn" onClick={addBook}>
          Add Book
        </button>
      </div>

      <div className="book-list">
        {userInfo
          ? userInfo.map((x) => (
              <Book
                key={x.timeKey}
                timeKey={x.timeKey}
                title={x.title}
                author={x.author}
                deleteData={deleteData}
                updateData={updateData}
              />
            ))
          : null}
      </div>
    </div>
  )
}

export default App
