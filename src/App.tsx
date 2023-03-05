import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Test } from './Test'
import { Chess } from './components/Chess'
import { AppShell, Flex, Footer, Header, Title } from '@mantine/core'

const Main = () => (
  <BrowserRouter>
    <Switch>
      <Route path={'/test'} component={Test} />
      <Route exact path={'/'} component={Chess} />
    </Switch>
  </BrowserRouter>
)

function App() {
  return (
    <div>
      <AppShell
        padding="md"
        header={
          <Header height={60} p="xs">
            <Title order={2}>Chess Game</Title>
          </Header>
        }
        footer={
          <Footer height={60} p="md">
            Application footer
          </Footer>
        }
        styles={(theme) => ({
          main: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
          },
        })}>
        <Main />
      </AppShell>
    </div>
  )
}

export default App
