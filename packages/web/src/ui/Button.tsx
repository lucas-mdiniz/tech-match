import styled from 'styled-components';
import { Button } from 'rebass/styled-components';

Button.defaultProps = {
  height: '50px'
}

export default styled(Button)`
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  padding: 10px;
`;