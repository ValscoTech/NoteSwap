// create a json dummy data for testing
import 'package:noteswap/postoffer/domain/notes_model.dart';

List<NotesModel> getDummyNotes() {
  return [
    NotesModel(
      id: "1",
      title: "Note 1",
      courseCode: 'BCSE201P',
      courseName: 'Python Programming',
      modules: [1, 2, 3, 4],
      school: 'SCOPE',
      price: 100,
    ),
    NotesModel(
      id: "2",
      title: "Note 2",
      courseCode: 'BCSE102L',
      courseName: 'Basic Electrical and Electronics',
      modules: [3, 4],
      school: 'SELECT',
      price: 150,
    ),
    NotesModel(
      id: "3",
      title: "Note 3",
      courseCode: 'BMAT102P',
      courseName: 'Differential Equation and Transforms',
      modules: [1, 2, 3, 4, 5],
      school: 'SENSE',
      price: 150,
    ),
  ];
}
