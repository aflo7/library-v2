import React, { useEffect, useState } from "react"
import "./css/book.css"

const noEdit = {
  padding: "5px",
  fontSize: "12pt",
  width: "250px",
  border: "none",
  backgroundColor: "inherit",
  borderBottom: "none"
}

const edit = {
  padding: "5px",
  fontSize: "12pt",
  width: "250px",
  border: 'none',
  borderBottom: '1px solid blue'
}

const Book = ({ title, author, deleteData, timeKey, updateData }) => {
  const [t, setT] = useState("")
  const [a, setA] = useState("")
  const [editText, setEditText] = useState("Edit")
  const [textEditable, setTextEditable] = useState(true)
  const [inputStyle, setInputStyle] = useState(noEdit)

  const toggleEditText = () => {
    if (editText === "Edit") {
      setEditText("Done")
      setTextEditable(false)
      setInputStyle(edit)
    } else if (editText === "Done") {
      updateData(t, a, timeKey)
      setEditText("Edit")
      setTextEditable(true)
      setInputStyle(noEdit)
    }
  }

  const handleTitleChange = (text) => {
    setT(text)
  }

  const handleAuthorChange = (text) => {
    setA(text)
  }

  useEffect(() => {
    if (title) {
      setT(title)
    }
  }, [title])

  useEffect(() => {
    if (author) {
      setA(author)
    }
  }, [author])

  return (
    <div className="book-component">
      <div className="book-title-wrapper">
        <div className="book-title-text">Title:</div>
        <input
          value={t}
          id="book-title"
          style={inputStyle}
          readOnly={textEditable}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
      </div>

      <div className="book-author-wrapper">
        <div className="book-author-text">Author:</div>
        <input
          value={a}
          id="book-author"
          className="book-author"
          style={inputStyle}
          readOnly={textEditable}
          onChange={(e) => handleAuthorChange(e.target.value)}
        />
      </div>

      <div className="book-button-wrapper">
        <button className="book-edit-btn" onClick={() => toggleEditText()}>
          {editText}
        </button>
        <button className="book-delete-btn" onClick={() => deleteData(timeKey)}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default Book
