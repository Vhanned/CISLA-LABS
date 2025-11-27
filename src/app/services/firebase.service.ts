import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  Timestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { environment } from '../../environments/environment';

export interface Contacto {
  nombre: string;
  correo: string;
  telefono: string;
  asunto: string;
  mensaje: string;
  fechaEnvio?: any;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private db;
  private app;

  constructor() {
    // Inicializa Firebase
    this.app = initializeApp(environment.firebase);
    this.db = getFirestore(this.app);
    console.log('🔥 Firebase inicializado correctamente');
  }

  /**
   * Guarda un contacto en Firestore
   */
  async guardarContacto(contacto: Contacto): Promise<any> {
    try {
      const contactosRef = collection(this.db, 'contactos');
      const contactoConFecha = {
        ...contacto,
        fechaEnvio: Timestamp.now()
      };

      const docRef = await addDoc(contactosRef, contactoConFecha);
      console.log('✅ Contacto guardado con ID:', docRef.id);

      return {
        success: true,
        id: docRef.id,
        mensaje: 'Contacto guardado exitosamente'
      };
    } catch (error: any) {
      console.error('❌ Error al guardar contacto:', error);
      throw new Error(error.message || 'Error al guardar en Firebase');
    }
  }

  /**
   * Obtiene todos los contactos (útil para un panel admin)
   */
  async obtenerContactos(): Promise<Contacto[]> {
    try {
      const contactosRef = collection(this.db, 'contactos');
      const q = query(contactosRef, orderBy('fechaEnvio', 'desc'));
      const snapshot = await getDocs(q);

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as any));
    } catch (error) {
      console.error('❌ Error al obtener contactos:', error);
      throw error;
    }
  }

  /**
   * Verifica la conexión con Firebase
   */
  verificarConexion(): boolean {
    return this.app !== null && this.db !== null;
  }
}