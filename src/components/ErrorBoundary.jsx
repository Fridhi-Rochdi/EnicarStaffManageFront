import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

export function ErrorBoundary() {
  const error = useRouteError();
  console.error('Route Error:', error);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-6" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 border border-red-100">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center">
            <span className="material-icons text-white text-5xl">error_outline</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Une erreur s'est produite
        </h1>

        {/* Error Message */}
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="material-icons text-red-600 mt-0.5">info</span>
            <div className="flex-1">
              <p className="font-semibold text-red-900 mb-1">Message d'erreur :</p>
              <p className="text-red-700 text-sm">
                {error?.statusText || error?.message || 'Une erreur inattendue s\'est produite'}
              </p>
              {error?.status && (
                <p className="text-red-600 text-xs mt-2 font-mono">
                  Code: {error.status}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Stack trace (dev mode only) */}
        {error?.stack && import.meta.env.DEV && (
          <details className="bg-gray-100 rounded-xl p-4 mb-6">
            <summary className="cursor-pointer font-semibold text-gray-700 mb-2">
              Détails techniques (Développeur)
            </summary>
            <pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap">
              {error.stack}
            </pre>
          </details>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition font-medium"
          >
            <span className="material-icons text-sm">arrow_back</span>
            Retour
          </button>
          <Link
            to="/home"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition font-medium"
          >
            <span className="material-icons text-sm">home</span>
            Accueil
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-medium"
          >
            <span className="material-icons text-sm">refresh</span>
            Recharger
          </button>
        </div>

        {/* Help text */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Si le problème persiste, veuillez contacter l'administrateur système.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;
