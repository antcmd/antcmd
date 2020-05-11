import { Container, Bot, Content, Bubbles, Bubble } from 'styles/Bot'

const bubbles = ['#stock', '#weather', '#recipes', '#remind', '#send']

export default () => (
  <Container>
    <Bot>
      <span role="img" aria-label="bot" aria-labelledby="robot">
        🤖
      </span>
    </Bot>
    <Content>
      <Bubbles>
        {bubbles.map((bubble) => (
          <Bubble>{bubble}</Bubble>
        ))}
      </Bubbles>
    </Content>
  </Container>
)
