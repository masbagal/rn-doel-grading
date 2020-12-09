
import firebase from 'firebase/app';
import 'firebase/database';
import { initializeFirebase } from './initFirebase';
initializeFirebase();
const database = firebase.database();

export function getAllAssignments() {
  return getDataFromFirebaseOnce('/assignments');
  // return new Promise((resolve) => resolve(sampleData.assignments));
}

export function getAssignment(assignmentId: string) {
  return getDataFromFirebaseOnce(`/assignments/${assignmentId}`);
  // return new Promise((resolve) => resolve(sampleData.assignments[assignmentId]));
}

export function detachListener() {
  database.ref('/assignments').off();
  database.ref('/criterias').off();
}

export function getAssignmentCriterias(assignmentId: string) {
  return getDataFromFirebaseOnce(`/criterias/${assignmentId}`);
}

export function addNewCriteria(assignmentId: string, criteriaName: string) {
  const newCriteriaKey = database.ref().child(`/assignments/${assignmentId}/criteria`).push().key;
  const insertQuery = `/assignments/${assignmentId}/criteria/${newCriteriaKey}`;
  const insertedData = { [insertQuery]: criteriaName };
  database.ref().update(insertedData);
}

export function addNewCriteriaDetail(assignmentId: string, criteriaId: string, criteriaDetail: string, grade: string) {
  const newCriteriaDetailKey = database.ref().child(`/criterias/${assignmentId}/${criteriaId}`).push().key;
  const insertQuery = `/criterias/${assignmentId}/${criteriaId}/${newCriteriaDetailKey}`;
  const insertedData = { [insertQuery]: { criteriaGrade: grade, description: criteriaDetail } };
  database.ref().update(insertedData);
}

export function removeCriteria(assignmentId: string, criteriaId: string) {
  const removedAssignmentCriteria = database.ref(`/assignments/${assignmentId}/criteria/${criteriaId}`);
  const removedCriteriaDetails = database.ref(`/criterias/${assignmentId}/${criteriaId}`);
  removedAssignmentCriteria.set(null);
  removedCriteriaDetails.set(null);
}

export function removeCriteriaDetail(assignmentId: string, criteriaId: string, criteriaDetailId: string) {
  const removedRef = database.ref(`/criterias/${assignmentId}/${criteriaId}/${criteriaDetailId}`);
  removedRef.set(null);
}

export function addNewAssignment(assignmentTitle: string, assignmentDate: number) {
  const newAssignmentKey = database.ref().child(`/assignments`).push().key;
  const insertQuery = `/assignments/${newAssignmentKey}`;
  const insertedData = { [insertQuery]: { title: assignmentTitle, date: assignmentDate } };
  return database.ref().update(insertedData);
}

export async function removeAssignment(assignmentId: string) {
  const removedAssignmentRef = database.ref(`/assignments/${assignmentId}`);
  const removedCriteriasRef = database.ref(`/criteria/${assignmentId}`);
  const removedGradesRef = database.ref(`/grades/${assignmentId}`);
  await removedAssignmentRef.set(null);
  await removedCriteriasRef.set(null);
  await removedGradesRef.set(null);
  return true;
}

export async function editAssignment(assignmentId: string, title: string, date: string) {
  const updateTitleQuery = `/assignments/${assignmentId}/title`;
  const updateDateQuery = `/assignments/${assignmentId}/date`;

  const updatedDate =
  {
    [updateTitleQuery]: title,
    [updateDateQuery]: date,
  };
  return database.ref().update(updatedDate);
}

export function getDataFromFirebase(query: string, callback: (snapshot: any) => void) {
  database.ref(query).on('value', callback);
}

async function getDataFromFirebaseOnce(query: string) {
  const result = await database.ref(query).once('value');
  return result.val();
}