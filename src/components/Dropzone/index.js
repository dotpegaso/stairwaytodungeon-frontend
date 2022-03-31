import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

import { socket } from '../../pages/_app'

import * as S from './styles'

const Dropzone = () => {
  const [files, setFiles] = useState([])

  const onDrop = useCallback((acceptedFiles) => {
    const files = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    )

    setFiles(files)

    const reader = new FileReader()
    reader.onloadend = function () {
      socket.emit('imageUpload', { image: reader.result })
    }
    reader.readAsDataURL(files[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  const thumbs = files.map((file, index) => {
    console.log('file', file)

    return <img key={index} src={file.preview} />
  })

  return (
    <>
      <S.Container {...getRootProps()}>
        <S.Input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag n drop some files here, or click to select files</p>
        )}
      </S.Container>
      {thumbs}
    </>
  )
}
export default Dropzone
