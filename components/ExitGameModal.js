import React from 'react';
import { Text, Button, Modal, } from 'native-base';

export default function CustomModal({backAction, onClose, onAccept}) {
    return (
        <Modal isOpen={backAction} onClose={() => onClose()}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Leave Lobby</Modal.Header>
                <Modal.Body>
                    <Text>
                        Are you sure you want to leave the game lobby? If you are the owner of it, the lobby will be canceled.
                    </Text>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button
                            onPress={() => {
                                onClose()
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            colorScheme="red"
                            onPress={() => {
                                onAccept()
                            }}
                        >
                            Exit lobby
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}