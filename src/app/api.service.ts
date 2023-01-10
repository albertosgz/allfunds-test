import { Observable, Subject, catchError, map, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_CONFIG = {
  CLIENT_ID: 'webfg-test',
  CLIENT_PASSWORD: 'WW58YJj89ltR43Cr',
  USERNAME: 'test001',
  PASSWORD: 'ryby3NTyKduAMcvZ',
}

// And respective field associated from API
export interface QuoteData {
  Last: {
    v?: number; //LVAL_NORM.v
    d?: string; //LVAL_NORM.d
  }
  Close: {
    v?: number; //CLOSE_ADJ_NORM.v
    d?: string; //CLOSE_ADJ_NORM.d
  }
  DayChangePerc: { //Day Change %
    v?: number; //NC2_PR_NORM.v
  }
  DayChange: {
    v?: number; //NC2_NORM.v
  }
  Volume: {
    v?: number; //VOL.v
  }
  Turnover: {
    v?: number; //TUR.v
  }
  PreviousYearClose: { //Previous year close
    v?: number; //PY_CLOSE.v
    d?: string; //PY_CLOSE.d
  }
  YTD: { // YTD%
    v?: number; //YTD_PR_NORM.v
  }
}

interface FieldDto {
  d: string;
  v: number;
}

interface QuotesResponseDto {
  quotes: {
    fields: {
      CLOSE_ADJ_NORM?: FieldDto;
      LVAL_NORM?: FieldDto;
      NC2_NORM?: FieldDto;
      NC2_PR_NORM?: FieldDto;
      PY_CLOSE?: FieldDto;
      TUR?: FieldDto;
      VOL?: FieldDto;
      YTD_PR_NORM?: FieldDto;
    }
  }[];
}

export interface AuthTokenConfiguration {
  access_token: string,
  // expires_in: number,
  // refresh_token: string,
  // scope: 'uaa.user',
  // token_type: 'bearer',
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getQuote(): Observable<QuoteData> {
    return this.initBearerToken()
      .pipe(
        switchMap(config => {
          return this.httpClient
          .get<QuotesResponseDto>('https://integra1.solutions.webfg.ch/restweb/quotes/2970161-1058-814', {
            headers: {
              'Authorization': `Bearer ${config.access_token}`,
              'Accept':  'application/vnd.solid-v1.0+json',
            },
            params: {
              'fields': 'LVAL_NORM,CLOSE_ADJ_NORM,NC2_PR_NORM,NC2_NORM,VOL,TUR,PY_CLOSE,YTD_PR_NORM',
            }
          })
          .pipe(
            catchError(err => {
              console.error(err);
              return of({ quotes: [] });
            }),
            map(response => {
              return response.quotes.map(quote => {
                const fields = quote.fields;
                return {
                  Last: {
                    v: fields.LVAL_NORM?.v,
                    d: fields.LVAL_NORM?.d,
                  },
                  Close: {
                    v: fields.CLOSE_ADJ_NORM?.v,
                    d: fields.CLOSE_ADJ_NORM?.d,
                  },
                  DayChangePerc: { //Day Change %
                    v: fields.NC2_PR_NORM?.v,
                  },
                  DayChange: {
                    v: fields.NC2_NORM?.v,
                  },
                  Volume: {
                    v: fields.VOL?.v,
                  },
                  Turnover: {
                    v: fields.TUR?.v,
                  },
                  PreviousYearClose: { //Previous year close
                    v: fields.PY_CLOSE?.v,
                    d: fields.PY_CLOSE?.d,
                  },
                  YTD: { // YTD%
                    v: fields.YTD_PR_NORM?.v,
                  },
                }
              });
            }),
            map(quotes => quotes[0]),
          )
        })
      );
  }

  private initBearerToken(): Observable<AuthTokenConfiguration> {
    const authorizationBasic = btoa(`${API_CONFIG.CLIENT_ID}:${API_CONFIG.CLIENT_PASSWORD}`);
    return this.httpClient
      .post<AuthTokenConfiguration>('https://integra1.solutions.webfg.ch/restweb/oauth/token', {}, {
        headers: {
          'Authorization': `Basic ${authorizationBasic}`,
          'Content-Type':  'application/x-www-form-urlencoded',
        },
        params: {
          'grant_type': 'password',
          'scope': 'uaa.user',
          'username': API_CONFIG.USERNAME,
          'password': API_CONFIG.PASSWORD,
        }
      })
      .pipe(
        catchError(err => {
          console.error(err);
          return of({ access_token: '' });
        }),
      );
  }
}
