import React, { PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import { Glyphicon } from 'react-bootstrap'
import { shell } from 'electron'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import styled from 'styled-components'

import regularStyles from './areaLinks.css'
import pdfStyles from './areaLinksPdf.css'

const StyledDropzone = styled(Dropzone)`
  width: 100%;
  height: 100%;
  border-color: transparent;
`
const DropzoneInnerDiv = styled.div`
  width: 100%;
  height: 100%;
  border-width: 2px;
  border-color: #666;
  border-style: dashed;
  border-radius: 5px;
  padding: 5px;
`
const Container = styled.div`
  grid-area: areaLinks;
  background-color: ${props =>
    props['data-isPdf'] ? 'rgb(227, 232, 255)' : '#e3fff0'};
  display: grid;
  grid-template-columns: ${props =>
    props['data-isPdf'] ? '100%' : 'calc(100% - 308px) 300px'};
  grid-template-areas: ${props =>
    props['data-isPdf']
      ? `'title' 'links'`
      : `'title dropzone' 'links dropzone'`};
  grid-column-gap: 8px;
  grid-row-gap: ${props => (props['data-isPdf'] ? '1px' : '8px')};
  padding: 8px;
  border: ${props => (props['data-isPdf'] ? '1px solid #ccc' : 'none')};
  border-bottom: none;
  font-size: ${props => (props['data-isPdf'] ? '10px' : 'inherit')};
`
const Title = styled.div`
  font-weight: 900;
  font-size: 16px;
  grid-area: title;
`
const Links = styled.div`
  grid-area: links;
  display: ${props => (props['data-isPdf'] ? 'grid' : 'block')};
  grid-template-columns: ${props => (props['data-isPdf'] ? '100%' : 'none')};
`
const Field = styled.div`
  grid-column: 1;
  display: grid;
  grid-template-columns: calc(100% - 20px) 20px;
  grid-gap: 0;
  border-bottom: thin solid #cecbcb;
  padding: 3px;
  align-items: center;
  &:first-of-type {
    border-top: thin solid #cecbcb;
  }
  &:hover {
    background-color: #ceffe5;
  }
`

const enhance = compose(
  inject('store'),
  withHandlers({
    onDrop: props => files => {
      const { store } = props
      const { linkNewCreate } = store
      const { activeId } = store.geschaefte
      console.log('AreaLinks: activeId:', activeId)
      console.log('AreaLinks: path:', files[0].path)
      linkNewCreate(activeId, files[0].path)
    },
  }),
  observer
)

const AreaLinks = ({ store, onDrop }) => {
  const { linkRemove } = store
  const { activeId, links } = store.geschaefte
  const myLinks = links.filter(l => l.idGeschaeft === activeId)
  console.log('AreaLinks: myLinks:', myLinks)
  const path = store.history.location.pathname
  const isPdf = path === '/geschaeftPdf'
  const styles = isPdf ? pdfStyles : regularStyles

  return (
    <Container data-isPdf={isPdf}>
      <Title>Links</Title>
      <Links data-isPdf={isPdf}>
        {myLinks.map(link => (
          <Field key={`${link.idGeschaeft}${link.url}`}>
            <div className={styles.url}>
              <a
                href={link.url}
                onClick={event => {
                  event.preventDefault()
                  shell.openItem(link.url)
                }}
              >
                {link.url}
              </a>
            </div>
            <div className={styles.deleteGlyphiconDiv}>
              <Glyphicon
                glyph="remove-circle"
                onClick={() => linkRemove(activeId, link.url)}
                className={styles.removeGlyphicon}
                title="Link entfernen"
              />
            </div>
          </Field>
        ))}
      </Links>
      <div className={styles.dropzoneContainer}>
        <StyledDropzone onDrop={onDrop}>
          {({ isDragActive, isDragReject }) => {
            if (isDragActive) {
              return (
                <DropzoneInnerDiv>
                  <div>jetzt fallen lassen...</div>
                </DropzoneInnerDiv>
              )
            }
            if (isDragReject) {
              return (
                <DropzoneInnerDiv>
                  <div>Hm. Da ging etwas schief :-(</div>
                </DropzoneInnerDiv>
              )
            }
            return (
              <DropzoneInnerDiv>
                <div>Datei hierhin ziehen...</div>
                <div>...oder klicken, um sie zu wählen.</div>
              </DropzoneInnerDiv>
            )
          }}
        </StyledDropzone>
      </div>
    </Container>
  )
}

AreaLinks.displayName = 'AreaLinks'

AreaLinks.propTypes = {
  store: PropTypes.object.isRequired,
  onDrop: PropTypes.func.isRequired,
}

export default enhance(AreaLinks)
