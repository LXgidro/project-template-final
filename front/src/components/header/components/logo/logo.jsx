import { Link } from 'react-router';
import { Icon } from '../../../../components';
import styled from 'styled-components';

const LargeText = styled.div`
  font-size: 48px;
  font-weight: 600;
  line-height: 40px;
  margin-top: 18px;
`;

const SmallText = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const LogoContainer = ({ className }) => (
  <Link className={className} to="/">
    <Icon id="fa-code" size="70px" margin="0 10px 0 0" />
    <div>
      <LargeText>Блог</LargeText>
      <SmallText>веб-разроботчика</SmallText>
    </div>
  </Link>
);
export const Logo = styled(LogoContainer)`
  display: flex;
  margin-top: -14px;
`;
