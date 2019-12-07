import React from "react";
import AvatarEditor from "react-avatar-editor";
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import imgPlaceholder from '../../../../assets/img/imgPlaceholder.png';
// import s from './PhotoEditor.module.sass';

class PhotoEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: imgPlaceholder,
            allowZoomOut: false,
            position: { x: 0.5, y: 0.5 },
            rotate: 0,
            scale: 1,
            width: 200,
            height: 200
        };
        this.handleNewImage = this.handleNewImage.bind(this);
        this.handleScale = this.handleScale.bind(this);
        this.handlePositionChange = this.handlePositionChange.bind(this);
        this.handleRotateRight = this.handleRotateRight.bind(this);
        this.handleRotateLeft = this.handleRotateLeft.bind(this);
        this.setEditorRef = this.setEditorRef.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }
    handleNewImage = e => {
        this.setState({ image: e.target.files[0] });
    };

    handleScale = e => {
        const scale = parseFloat(e.target.value);
        this.setState({ scale });
    };

    handlePositionChange = position => {
        this.setState({ position });
    };

    handleRotateRight = e => {
        e.preventDefault();
        this.setState({ rotate: this.state.rotate - 90 });
    };

    handleRotateLeft = e => {
        e.preventDefault();
        this.setState({ rotate: this.state.rotate + 90 });
    };

    setEditorRef = (editor) => this.editor = editor;

    onClickSave = () => {
        if (this.editor) {
            const canvas = this.editor.getImage();
            canvas.toBlob(blob => {
                const fd = new FormData()
                fd.append('avatar', blob)
                this.props.onSubmit(fd);
            }, 'image/jpg')
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.avatarEditMode}
                fade={false}
                toggle={this.props.editAvatarStop}
            >
                <ModalBody>
                    <div>
                        <AvatarEditor
                            ref={this.setEditorRef}
                            scale={parseFloat(this.state.scale)}
                            width={this.state.width}
                            height={this.state.height}
                            position={this.state.position}
                            rotate={parseFloat(this.state.rotate)}
                            onPositionChange={this.handlePositionChange}
                            image={this.state.image}
                            className="editor-canvas"
                        />
                    </div>
                    <div>
                        <span>New File:</span>
                        <input
                            name="newImage"
                            type="file"
                            onChange={this.handleNewImage}
                        />
                        <br />
                        <span>Zoom:</span>
                        <input
                            name="scale"
                            type="range"
                            onChange={this.handleScale}
                            min={this.state.allowZoomOut ? "0.1" : "1"}
                            max="2"
                            step="0.01"
                            value={this.state.scale}
                        />
                        <br />
                        <button onClick={this.handleRotateRight}>
                            Rotate &#60;
                        </button>
                        <button onClick={this.handleRotateLeft}>
                            Rotate &#62;
                        </button>
                    </div>
                    <ModalFooter>
                        <Button onClick={this.props.editAvatarStop}>
                            Close
                        </Button>
                        <Button onClick={this.onClickSave}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalBody>
            </Modal>
        );
    }
}

export default PhotoEditor;
