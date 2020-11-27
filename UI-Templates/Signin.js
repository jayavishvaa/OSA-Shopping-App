import React, {useState} from 'react';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
  Form,
  Item,
  Label,
  Input,
  H1,
  Button,
  Icon,
  Text,
  CheckBox,
  ListItem,
} from 'native-base';
import {StyleSheet} from 'react-native';

const App = () => {
  const [num, setNum] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Container>
      <Header style={styles.header}>
        <Body>
          <Title style={{fontSize: 30, paddingLeft: '5%', fontWeight: 'bold'}}>
            OSA
          </Title>
        </Body>
        <Right>
          <Button transparent>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>Sign up</Text>
          </Button>
        </Right>
      </Header>
      <Content>
        <Text
          style={{
            fontSize: 40,
            fontWeight: 'bold',
            paddingTop: '10%',
            paddingLeft: '3%',
          }}>
          Sign in
        </Text>
        <Form style={styles.form}>
          <Item inlineLabel>
            <Label>Mobile No.</Label>
            <Input value={num} onChangeText={(num) => setNum(num)} />
          </Item>
          <Item inlineLabel last>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              value={pwd}
              onChangeText={(pwd) => setPassword(pwd)}
            />
          </Item>
          <Text
            style={{color: 'darkblue', paddingTop: '7%', paddingBottom: '10%'}}>
            FORGOT PASSWORD?
          </Text>
          <Button rounded style={styles.buttton}>
            <Text style={styles.text}>CONTINUE</Text>
          </Button>
          <Text style={{textAlign: 'center', padding: '6%'}}>OR</Text>
          <Button rounded bordered style={styles.buttton}>
            <Text style={styles.text}>SIGN IN WITH GOOGLE</Text>
          </Button>
          <Button rounded bordered style={styles.buttton}>
            <Text style={styles.text}>LOGIN AS GUEST</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#000000',
  },
  form: {
    paddingLeft: '4%',
    paddingTop: '10%',
  },
  buttton: {
    width: '89%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
export default App;
