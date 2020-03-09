import * as React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components';
import { Feather as Icon } from '@expo/vector-icons';

export default ({ value, onValueChange }) => {
    return (
        <Container>
            <Switch
                thumbColor={ Platform.OS === 'android' ? 'white' : undefined }
                trackColor={ {
                    false: '#3884ff',
                    true: '#3884ff',
                } }
                { ...{
                    value,
                    onValueChange,
                } }
            />
            { value && <Icon name="sun" color="white" size={ 32 } /> }
            { !value && <Icon name="moon" color={ '#3884ff' } size={ 32 } /> }
        </Container>
    );
};

const Container = styled.View`
  flex-direction: row;
  padding: 16px;
  align-items: center;
`;

const Switch = styled.Switch`
  margin-right: 8px;
`;
