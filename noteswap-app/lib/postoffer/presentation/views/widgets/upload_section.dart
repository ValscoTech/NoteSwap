import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter_svg/svg.dart';

class UploadSection extends StatefulWidget {
  const UploadSection({super.key});

  @override
  State<UploadSection> createState() => _UploadSectionState();
}

class _UploadSectionState extends State<UploadSection> {
  final double _uploadProgress = 0.0;

  Future<void> _pickFiles() async {
    FilePickerResult? result =
        await FilePicker.platform.pickFiles(allowMultiple: true);

    if (result != null) {
      for (var file in result.files) {
        // _uploadFile(file);
        print('File selected: ${file.name}');
      }
    } else {
      // User canceled the picker
      print('File selection canceled');
    }
    ('File selection canceled');
  }

  //  Future<void> _uploadFile(PlatformFile file) async {
  //   final storageRef = FirebaseStorage.instance.ref().child('uploads/${file.name}');
  //   final uploadTask = storageRef.putFile(File(file.path!));

  //   uploadTask.snapshotEvents.listen((TaskSnapshot snapshot) {
  //     setState(() {
  //       _uploadProgress[file.name] = snapshot.bytesTransferred / snapshot.totalBytes;
  //     });
  //   });

  //   await uploadTask.whenComplete(() {
  //     setState(() {
  //       _uploadProgress[file.name] = 1.0;
  //     });
  //   });

  @override
  Widget build(BuildContext context) {
    final color = Theme.of(context).colorScheme;
    final layout = MediaQuery.of(context).size;
    return Container(
      padding: const EdgeInsets.all(12),
      width: layout.width * 0.8,
      height: layout.height * 0.8,
      decoration: BoxDecoration(
        color: color.primary,
        borderRadius: const BorderRadius.all(
          Radius.circular(20),
        ),
      ),
      child: Align(
        alignment: Alignment.topCenter,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Text(
              'Upload Notes',
              style: TextStyle(
                fontSize: 24,
                color: color.onSecondary,
              ),
            ),
            GestureDetector(
              onTap: _pickFiles,
              child: Container(
                width: layout.width,
                height: layout.height * 0.2,
                decoration: BoxDecoration(
                  color: color.surface,
                  borderRadius: const BorderRadius.all(Radius.circular(20)),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    SvgPicture.asset(
                      'assets/icons/upload.svg',
                    ),
                    const SizedBox(height: 5),
                    const Text(
                      'Upload your files(png, jpg, pdf)',
                      style: TextStyle(fontSize: 14),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 20),
            // Expanded(
            //   child: ListView.builder(
            //     itemCount: _uploadProgress.keys.length,
            //     itemBuilder: (context, index) {
            //       String fileName = _uploadProgress.keys.elementAt(index);
            //       double progress = _uploadProgress[fileName]!;
            //       return ListTile(
            //         title: Text(fileName),
            //         subtitle: LinearProgressIndicator(value: progress),
            //       );
            //     },
            //   ),
            // ),
          ],
        ),
      ),
    );
  }
}
