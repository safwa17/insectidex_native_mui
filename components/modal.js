// import React, { useState, useEffect } from 'react'
// import { View } from 'react-native';
// import { Modal, Text, Button, Portal, PaperProvider } from 'react-native-paper';

// const Custommodal = ({ isOpen, handleClose, title, content, action, handler }) => {
//     return (
//         <PaperProvider>
//             <Portal>
//                 <Modal visible={isOpen} onDismiss={handleClose}>
//                     <Modal.Title>{title}</Modal.Title>
//                     <Modal.Content>
//                         <Text>{content}</Text>
//                     </Modal.Content>
//                     <Modal.Actions>
//                         <Button onPress={handleClose}>Cancel</Button>
//                         <Button onPress={handler}>{action}</Button>
//                     </Modal.Actions>
//                 </Modal>
//             </Portal>
//         </PaperProvider>
//     );
// };

// export default Custommodal;
