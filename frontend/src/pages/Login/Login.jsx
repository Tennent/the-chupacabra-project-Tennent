import React from 'react'

export default function Login() {
  return (
    <div>
      <form action="submit">
        <label>Username:
          <input type="text" />
        </label>
        <label>Password:
          <input type="password" />
        </label>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
