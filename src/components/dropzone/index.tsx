import React from 'react';
import { Button, Flex, useColorModeValue } from '@chakra-ui/react';
// Assets
import Dropzone from 'react-dropzone';

function CustomDropzone(props: { content: JSX.Element | string;[x: string]: any }) {
  const { content, ...rest } = props;
  const bg = useColorModeValue('gray.100', 'navy.700');
  const borderColor = useColorModeValue('secondaryGray.100', 'whiteAlpha.100');
  return (
    <Dropzone>
      {({ getRootProps, getInputProps }) => (
        <Flex
          align='center'
          justify='center'
          bg={bg}
          border='1px dashed'
          borderColor={borderColor}
          borderRadius='16px'
          w='100%'
          h='max-content'
          minH='100%'
          cursor='pointer'
          {...getRootProps({ className: 'dropzone' })}
          {...rest}>
          <input {...getInputProps()} />
          <Button variant='no-effects'>{content}</Button>
        </Flex>
      )}
    </Dropzone>
  );
}

export default CustomDropzone