/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import axios from 'axios';
import { Box, Button, Flex, useToast, Icon, Text, Image, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, useDisclosure } from '@chakra-ui/react'
import { MdUpload } from 'react-icons/md';
import Dropzone from 'react-dropzone';

import DashboardLayout from '~/components/layout'
import Panel from '~/components/panel';

import { endpoints } from '~/services/api';

const FileUploadPage = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  const [uploadedFile, setUploadedFile] = useState<string>('')
  const toast = useToast()

  // functions
  const uploadFile = async (file: any) => {
    console.log(file)
    const config = {
      headers: {
        accept: '*/*',
        'Content-Type': 'multipart/form-data',
      },
    };

    const body = {
      file: file[0]
    }

    try {
      const response = await axios.post(endpoints.files.postFile, body, config);
      toast({
        title: 'Upload concluído!',
        status: 'success',
        isClosable: true,
      })
      onOpen()
      setUploadedFile(response.data?.location)
    } catch (error) {
      toast({
        title: error.message,
        status: 'error',
        isClosable: true,
      })
    }

  }

  return (
    <DashboardLayout screenTitle='Novo arquivo'>
      <Flex direction='column' gap='20px'>
        <Panel padding='25px'>
          <Dropzone onDrop={(acceptedFiles: any) => uploadFile(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <Flex
                align='center'
                justify='center'
                bg={'gray.100'}
                border='1px dashed'
                borderColor={'secondaryGray.100'}
                borderRadius='16px'
                w='100%'
                h='max-content'
                minH='200px'
                cursor='pointer'
                {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <Button variant='no-effects'>
                  <Box>
                    <Icon as={MdUpload} w='80px' h='80px' color={'brand.500'} />
                    <Flex justify='center' mx='auto' mb='12px'>
                      <Text fontSize='xl' fontWeight='700' color={'brand.500'}>
                        Clique para escolher
                      </Text>
                    </Flex>
                    <Text fontSize='sm' fontWeight='500' color='secondaryGray.500'>
                      Extensões permitidas: PNG, JPG e GIF
                    </Text>
                  </Box>
                </Button>
              </Flex>
            )}
          </Dropzone>
        </Panel>
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Arquivo criado
            </AlertDialogHeader>

            <AlertDialogBody>
              <Image src={uploadedFile} alt='Imagem anexada' />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Fechar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </DashboardLayout>
  )
}

export default FileUploadPage