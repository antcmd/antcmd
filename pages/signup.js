import React, { useState } from 'react'
import Router from 'next/router'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { withApollo } from 'lib/apollo'
import { useEscapeToClose } from 'hooks'

const SignupMutation = gql`
  mutation SignupMutation($name: String!) {
    signupUser(name: $name) {
      id
      name
    }
  }
`

const Signup = () => {
  const [name, setName] = useState('')

  useEscapeToClose(() => Router.push('/'))

  const [signup] = useMutation(SignupMutation)

  const onSubmit = async (n) => {
    await signup({
      variables: {
        name: n,
      },
    })
    Router.push('/')
  }

  return (
    <>
      <div
        style={{
          width: 600,
        }}
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            onSubmit(name)
          }}
        >
          <h1>Your name is</h1>
          <input
            autoFocus
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            type="text"
            value={name}
          />
          <input disabled={!name} type="submit" value="OK" />
        </form>
      </div>
      <style jsx>
        {`
          .page {
            background: white;
            padding: 3rem;
            display: flex;
            justify-content: center;
          }

          h1 {
            margin: 0;
            opacity: 0.4;
          }

          input[type='text'] {
            width: 100%;
            background: transparent;
            border: none;
            font-size: 48px;
            outline: none;
            margin: 1rem 0;

            font-weight: 600;
          }

          input[type='submit'] {
            background: #ececec;
            border: 0;
            padding: 1rem 2rem;
            letter-spacing: -0.3px;
            font-weight: 600;
            outline: none;
          }
          input[type='submit']:not([disabled]) {
            color: #0c77f8;
          }
          input[type='submit']:not([disabled]):hover {
            background: #0c77f8;
            color: white;
            cursor: pointer;
          }
          input[type='submit']:not([disabled]):active {
            background: #4a9bfd;
          }
        `}
      </style>
    </>
  )
}

export default withApollo(Signup)
