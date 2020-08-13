const dev = {
  apiGateway: {
    URL: "https://workzen93dev-socialfeed.azurewebsites.net/api",
  },
  userToken:
    "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjJDQUQ5NDYxQkJBQUMyRjQ5OTg2QzlEMTkyNUM3MkJEMUREREExQjIiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJMSzJVWWJ1cXd2U1poc25Sa2x4eXZSM2RvYkkifQ.eyJuYmYiOjE1OTE4MjQ2NjcsImV4cCI6MTU5MTkxMTA2NywiaXNzIjoiaHR0cHM6Ly93b3JremVuOTNkZXYtc2kuYXp1cmV3ZWJzaXRlcy5uZXQiLCJhdWQiOlsiaHR0cHM6Ly93b3JremVuOTNkZXYtc2kuYXp1cmV3ZWJzaXRlcy5uZXQvcmVzb3VyY2VzIiwiR3JvdXBzQ29ubmVjdG9yU2NvcGUiLCJzaXRlY29yZS5wcm9maWxlLmFwaSJdLCJjbGllbnRfaWQiOiJHcm91cHNDb25uZWN0b3JBcGkiLCJzdWIiOiJVZlM5OTZZYjZETE0xSmV3d0pNcndEVVFnRGl6ZHROSlphNFFuclEweGdBIiwiYXV0aF90aW1lIjoxNTkxODI0NjY3LCJpZHAiOiJXb3JrWmVuLUF6dXJlQWQiLCJuYW1lIjoiT21hciBFbFNha2thIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS9pZGVudGl0eS9jbGFpbXMvb2JqZWN0aWRlbnRpZmllciI6ImQ0ZWUwYmE3LWU4YmQtNDU3Ny04MzYzLWYwMDk1ZDMyODhjYSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vaWRlbnRpdHkvY2xhaW1zL3RlbmFudGlkIjoiNWM1NDNiZDMtMjEwNi00YjQ0LWJlN2EtNzhjNmQzZDczNjk0IiwidG9rZW5fYWFkIjoiZXlKMGVYQWlPaUpLVjFRaUxDSnViMjVqWlNJNkltZFVSbXRWTkVwTE1EaFdjSHAzVFdaVGJtcFZOVWxwTW1wdk5UbGthMDVhUkhJd1YyRkpWekV6WlhNaUxDSmhiR2NpT2lKU1V6STFOaUlzSW5nMWRDSTZJbE56V25OQ1RtaGFZMFl6VVRsVE5IUnljRkZDVkVKNVRsSlNTU0lzSW10cFpDSTZJbE56V25OQ1RtaGFZMFl6VVRsVE5IUnljRkZDVkVKNVRsSlNTU0o5LmV5SmhkV1FpT2lKb2RIUndjem92TDJkeVlYQm9MbTFwWTNKdmMyOW1kQzVqYjIwaUxDSnBjM01pT2lKb2RIUndjem92TDNOMGN5NTNhVzVrYjNkekxtNWxkQzgxWXpVME0ySmtNeTB5TVRBMkxUUmlORFF0WW1VM1lTMDNPR00yWkROa056TTJPVFF2SWl3aWFXRjBJam94TlRreE9ESTBNelU1TENKdVltWWlPakUxT1RFNE1qUXpOVGtzSW1WNGNDSTZNVFU1TVRneU9ESTFPU3dpWVdOamRDSTZNQ3dpWVdOeUlqb2lNU0lzSW1GblpVZHliM1Z3SWpvaU15SXNJbUZwYnlJNklrRlRVVUV5THpoUVFVRkJRVXBaVDJSMWJHeEtMekoyTUc5WGJ6bEhRbE0zVFZCdVVYUk9iSEJtTTAxbGVXRk5aamx5VmtSUEwyODlJaXdpWVcxeUlqcGJJbkIzWkNKZExDSmhjSEJmWkdsemNHeGhlVzVoYldVaU9pSlhiM0pyZW1WdUlFUmxkbVZzYjNCdFpXNTBJaXdpWVhCd2FXUWlPaUkzTW1Zek5UUTNaQzFoTmpJeUxUUTVaRGN0T1RSalppMDRNak5pTURJNU1EQXdaRFFpTENKaGNIQnBaR0ZqY2lJNklqRWlMQ0ptWVcxcGJIbGZibUZ0WlNJNklrVnNVMkZyYTJFaUxDSm5hWFpsYmw5dVlXMWxJam9pVDIxaGNpSXNJbWx3WVdSa2NpSTZJakV3TWk0ME5TNDBOUzQwTmlJc0ltNWhiV1VpT2lKUGJXRnlJRVZzVTJGcmEyRWlMQ0p2YVdRaU9pSmtOR1ZsTUdKaE55MWxPR0prTFRRMU56Y3RPRE0yTXkxbU1EQTVOV1F6TWpnNFkyRWlMQ0p3YkdGMFppSTZJak1pTENKd2RXbGtJam9pTVRBd016SXdNREE1TWtFeFJUVTJSQ0lzSW5CM1pGOWxlSEFpT2lJNE1URTVPVElpTENKd2QyUmZkWEpzSWpvaWFIUjBjSE02THk5d2IzSjBZV3d1YldsamNtOXpiMlowYjI1c2FXNWxMbU52YlM5RGFHRnVaMlZRWVhOemQyOXlaQzVoYzNCNElpd2ljMk53SWpvaVFXeHNVMmwwWlhNdVJuVnNiRU52Ym5SeWIyd2dRV3hzVTJsMFpYTXVUV0Z1WVdkbElFRnNiRk5wZEdWekxsSmxZV1FnUVd4c1UybDBaWE11VjNKcGRHVWdRVzVoYkhsMGFXTnpMbEpsWVdRZ1FYQndRMkYwWVd4dlp5NVNaV0ZrVjNKcGRHVXVRV3hzSUVGd2NHeHBZMkYwYVc5dUxsSmxZV1F1UVd4c0lFRndjR3hwWTJGMGFXOXVMbEpsWVdSWGNtbDBaUzVCYkd3Z1EyRnNaVzVrWVhKekxsSmxZV1FnUTJGc1pXNWtZWEp6TGxKbFlXUXVVMmhoY21Wa0lFTmhiR1Z1WkdGeWN5NVNaV0ZrVjNKcGRHVWdRMkZzWlc1a1lYSnpMbEpsWVdSWGNtbDBaUzVUYUdGeVpXUWdRMmhoZEM1U1pXRmtJRU5vWVhRdVVtVmhaRmR5YVhSbElFTnZiblJoWTNSekxsSmxZV1FnUTI5dWRHRmpkSE11VW1WaFpDNVRhR0Z5WldRZ1EyOXVkR0ZqZEhNdVVtVmhaRmR5YVhSbElFTnZiblJoWTNSekxsSmxZV1JYY21sMFpTNVRhR0Z5WldRZ1JHVnNaV2RoZEdWa1VHVnliV2x6YzJsdmJrZHlZVzUwTGxKbFlXUlhjbWwwWlM1QmJHd2dSR2x5WldOMGIzSjVMa0ZqWTJWemMwRnpWWE5sY2k1QmJHd2dSR2x5WldOMGIzSjVMbEpsWVdRdVFXeHNJRVJwY21WamRHOXllUzVTWldGa1YzSnBkR1V1UVd4c0lHVnRZV2xzSUVaaGJXbHNlUzVTWldGa0lFWnBiR1Z6TGxKbFlXUWdSbWxzWlhNdVVtVmhaQzVCYkd3Z1JtbHNaWE11VW1WaFpDNVRaV3hsWTNSbFpDQkdhV3hsY3k1U1pXRmtWM0pwZEdVZ1JtbHNaWE11VW1WaFpGZHlhWFJsTGtGc2JDQkdhV3hsY3k1U1pXRmtWM0pwZEdVdVFYQndSbTlzWkdWeUlFWnBiR1Z6TGxKbFlXUlhjbWwwWlM1VFpXeGxZM1JsWkNCSGNtOTFjQzVTWldGa0xrRnNiQ0JIY205MWNDNVNaV0ZrVjNKcGRHVXVRV3hzSUVkeWIzVndUV1Z0WW1WeUxsSmxZV1F1UVd4c0lFZHliM1Z3VFdWdFltVnlMbEpsWVdSWGNtbDBaUzVCYkd3Z1NXUmxiblJwZEhsUWNtOTJhV1JsY2k1U1pXRmtMa0ZzYkNCSlpHVnVkR2wwZVZCeWIzWnBaR1Z5TGxKbFlXUlhjbWwwWlM1QmJHd2dUV0ZwYkM1U1pXRmtJRTFoYVd3dVVtVmhaQzVUYUdGeVpXUWdUV0ZwYkM1U1pXRmtRbUZ6YVdNZ1RXRnBiQzVTWldGa1YzSnBkR1VnVFdGcGJDNVNaV0ZrVjNKcGRHVXVVMmhoY21Wa0lFMWhhV3d1VTJWdVpDQk5ZV2xzTGxObGJtUXVVMmhoY21Wa0lFMWhhV3hpYjNoVFpYUjBhVzVuY3k1U1pXRmtJRTFoYVd4aWIzaFRaWFIwYVc1bmN5NVNaV0ZrVjNKcGRHVWdUV1Z0WW1WeUxsSmxZV1F1U0dsa1pHVnVJRTE1Um1sc1pYTXVVbVZoWkNCTmVVWnBiR1Z6TGxkeWFYUmxJRTV2ZEdWekxrTnlaV0YwWlNCT2IzUmxjeTVTWldGa0lFNXZkR1Z6TGxKbFlXUXVRV3hzSUU1dmRHVnpMbEpsWVdSWGNtbDBaU0JPYjNSbGN5NVNaV0ZrVjNKcGRHVXVRV3hzSUU1dmRHVnpMbEpsWVdSWGNtbDBaUzVEY21WaGRHVmtRbmxCY0hBZ1RtOTBhV1pwWTJGMGFXOXVjeTVTWldGa1YzSnBkR1V1UTNKbFlYUmxaRUo1UVhCd0lHOW1abXhwYm1WZllXTmpaWE56SUU5dWJHbHVaVTFsWlhScGJtZHpMbEpsWVdRZ1QyNXNhVzVsVFdWbGRHbHVaM011VW1WaFpGZHlhWFJsSUc5d1pXNXBaQ0JQY21kaGJtbDZZWFJwYjI0dVVtVmhaQzVCYkd3Z1QzSm5ZVzVwZW1GMGFXOXVMbEpsWVdSWGNtbDBaUzVCYkd3Z1QzSm5RMjl1ZEdGamRDNVNaV0ZrTGtGc2JDQlFaVzl3YkdVdVVtVmhaQ0JRWlc5d2JHVXVVbVZoWkM1QmJHd2dVR3hoWTJVdVVtVmhaQ0JRYkdGalpTNVNaV0ZrTGtGc2JDQlFiR0ZqWlM1U1pXRmtMbE5vWVhKbFpDQlFiR0ZqWlM1U1pXRmtWM0pwZEdVZ1VHeGhZMlV1VW1WaFpGZHlhWFJsTGtGc2JDQlFiMnhwWTNrdVVtVmhaQzVCYkd3Z1VISmxjMlZ1WTJVdVVtVmhaQ0JRY21WelpXNWpaUzVTWldGa0xrRnNiQ0J3Y205bWFXeGxJRkpsY0c5eWRITXVVbVZoWkM1QmJHd2dVMk5vWldSMWJHVXVVbVZoWkM1QmJHd2dVMk5vWldSMWJHVXVVbVZoWkZkeWFYUmxMa0ZzYkNCVGFYUmxjeTVHZFd4c1EyOXVkSEp2YkM1QmJHd2dVMmwwWlhNdVRXRnVZV2RsTGtGc2JDQlRhWFJsY3k1U1pXRmtMa0ZzYkNCVGFYUmxjeTVTWldGa1YzSnBkR1V1UVd4c0lGTnBkR1Z6TGxObFlYSmphQzVCYkd3Z1ZHRnphM011VW1WaFpDQlVZWE5yY3k1U1pXRmtMbE5vWVhKbFpDQlVZWE5yY3k1U1pXRmtWM0pwZEdVZ1ZHRnphM011VW1WaFpGZHlhWFJsTGxOb1lYSmxaQ0JVWldGdGMwRmpkR2wyYVhSNUxsSmxZV1FnVkdWaGJYTkJZM1JwZG1sMGVTNVRaVzVrSUZSbFlXMXpRWEJ3TGxKbFlXUWdWR1ZoYlhOQmNIQXVVbVZoWkZkeWFYUmxJRlJsY20xVGRHOXlaUzVTWldGa0xrRnNiQ0JVWlhKdFUzUnZjbVV1VW1WaFpGZHlhWFJsTGtGc2JDQlZjMlZ5TGtWNGNHOXlkQzVCYkd3Z1ZYTmxjaTVKYm5acGRHVXVRV3hzSUZWelpYSXVVbVZoWkNCVmMyVnlMbEpsWVdRdVFXeHNJRlZ6WlhJdVVtVmhaRUpoYzJsakxrRnNiQ0JWYzJWeUxsSmxZV1JYY21sMFpTQlZjMlZ5TGxKbFlXUlhjbWwwWlM1QmJHd2dWWE5sY2tGamRHbDJhWFI1TGxKbFlXUlhjbWwwWlM1RGNtVmhkR1ZrUW5sQmNIQWdWWE5sY2s1dmRHbG1hV05oZEdsdmJpNVNaV0ZrVjNKcGRHVXVRM0psWVhSbFpFSjVRWEJ3SUZWelpYSlVhVzFsYkdsdVpVRmpkR2wyYVhSNUxsZHlhWFJsTGtOeVpXRjBaV1JDZVVGd2NDSXNJbk4xWWlJNklsRlhSVGhIYmpSMU9YVnJiRko0T1VsWVpFVnNTMkZPWmxkd2VUWlhaV2Q1U2xka1QxVmtYemhMWjFFaUxDSjBaVzVoYm5SZmNtVm5hVzl1WDNOamIzQmxJam9pUVVZaUxDSjBhV1FpT2lJMVl6VTBNMkprTXkweU1UQTJMVFJpTkRRdFltVTNZUzAzT0dNMlpETmtOek0yT1RRaUxDSjFibWx4ZFdWZmJtRnRaU0k2SWs5dFlYSkFkMjl5YTNwbGJqSXdNakF1YjI1dGFXTnliM052Wm5RdVkyOXRJaXdpZFhCdUlqb2lUMjFoY2tCM2IzSnJlbVZ1TWpBeU1DNXZibTFwWTNKdmMyOW1kQzVqYjIwaUxDSjFkR2tpT2lKelVqZ3dUMG95T1daVmVUWXlWREF4VVVSSGVFRkJJaXdpZG1WeUlqb2lNUzR3SWl3aWQybGtjeUk2V3lJMk1tVTVNRE01TkMwMk9XWTFMVFF5TXpjdE9URTVNQzB3TVRJeE56Y3hORFZsTVRBaVhTd2llRzF6WDNSalpIUWlPakUxTnpZNU5qZ3pPRE45Lkx5Y3QzNkUtd1JhbWZ6NEc4NFc1QWtiS3RNdjFLczBtUlZRVERTeVJXa01haHQ1NzNLSUFVdnZXaDN0cXNzYUNjMTBudmVERHA4bGNxSXlSMjVRLWxZWklIZG5NNl9FRnEyRTVNUzR1RlRBaDNNMDhXUlk1azROV0hSY1ZvU1VxVmROeldlZ3ZMV0YtWlE2TGZmdW9uTUl3Sml0eEJqOXBuU3d2UjMzZU5NaU9iQl9nYUZka0dfekpwSl9YdTZSWVJ2ZFo2VVVHZ1hFZEZpMXRFLVFEUnRIM1RaNUpIbFQ4WkU2dDNNUEd0TUtFa0ZvR2RETC1sOURNWHhfNUhKNml4d1JRdmViaTJEMXVmQTdZRmJMejI3YUZOMkxlcFpOa0U4WkVCMlI3d2tsekZMdmo0UWtPdGJBTDFxQnhCc3RPeVVRSHVpNllVdkVXTjlIRlhjTWR4ZyIsImh0dHA6Ly93d3cuc2l0ZWNvcmUubmV0L2lkZW50aXR5L2NsYWltcy9vcmlnaW5hbElzc3VlciI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzVjNTQzYmQzLTIxMDYtNGI0NC1iZTdhLTc4YzZkM2Q3MzY5NC8iLCJodHRwOi8vd3d3LnNpdGVjb3JlLm5ldC9pZGVudGl0eS9jbGFpbXMvaXNBZG1pbiI6InRydWUiLCJlbWFpbCI6Ik9tYXJAd29ya3plbjIwMjAub25taWNyb3NvZnQuY29tIiwicm9sZSI6WyJzaXRlY29yZVxcQWRtaW4iLCJzaXRlY29yZVxcQ29udGVudCBBZG1pbiIsInNpdGVjb3JlXFxDb250ZW50IEFwcHJvdmVyIiwic2l0ZWNvcmVcXENvbnRlbnQgQXV0aG9yIl0sInNjb3BlIjpbIm9wZW5pZCIsInNpdGVjb3JlLnByb2ZpbGUiLCJHcm91cHNDb25uZWN0b3JTY29wZSIsInNpdGVjb3JlLnByb2ZpbGUuYXBpIl0sImFtciI6WyJkZWxlZ2F0aW9uIl19.veW59mON_221HmeytDp_B3YrZi2-3oWvxCb-h8faTmFSqY2P1v-VUzXaU1aI0aErydkNS_2RoOZyyYaGX5ublFp5TKuyzIoYJcR667FXsIJIn6ojUY6u3-zFzsrGBrgvbZbITMFOKCNO19IFqgyCUV0mKlRvpXll5R27EPyiSc-rgT-WFG00toYFwkNRYVZw0rzKZcsvmk8hDEIbLC-6RbIRrtijiKW-0hSDe4FyWUHLAIfmEFMSr5NClQ3VEzi8h1QF0RZUoYK_ykb015w95ba3m-rkBQcpzJAKQXqsiNPxBYsd-5zOLzEjFKGHoOQf1ZpwnME-MwecSv31lEIh5A",
};

const qa = {
  apiGateway: {
    URL: "https://workzen93qa-socialfeed.azurewebsites.net/api",
  },
  userToken:
    "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjJDQUQ5NDYxQkJBQUMyRjQ5OTg2QzlEMTkyNUM3MkJEMUREREExQjIiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJMSzJVWWJ1cXd2U1poc25Sa2x4eXZSM2RvYkkifQ.eyJuYmYiOjE1OTE4MTY3MDYsImV4cCI6MTU5MTkwMzEwNiwiaXNzIjoiaHR0cHM6Ly93b3JremVuOTNkZXYtc2kuYXp1cmV3ZWJzaXRlcy5uZXQiLCJhdWQiOlsiaHR0cHM6Ly93b3JremVuOTNkZXYtc2kuYXp1cmV3ZWJzaXRlcy5uZXQvcmVzb3VyY2VzIiwiR3JvdXBzQ29ubmVjdG9yU2NvcGUiLCJzaXRlY29yZS5wcm9maWxlLmFwaSJdLCJjbGllbnRfaWQiOiJHcm91cHNDb25uZWN0b3JBcGkiLCJzdWIiOiJVZlM5OTZZYjZETE0xSmV3d0pNcndEVVFnRGl6ZHROSlphNFFuclEweGdBIiwiYXV0aF90aW1lIjoxNTkxODE2NzA2LCJpZHAiOiJXb3JrWmVuLUF6dXJlQWQiLCJuYW1lIjoiT21hciBFbFNha2thIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS9pZGVudGl0eS9jbGFpbXMvb2JqZWN0aWRlbnRpZmllciI6ImQ0ZWUwYmE3LWU4YmQtNDU3Ny04MzYzLWYwMDk1ZDMyODhjYSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vaWRlbnRpdHkvY2xhaW1zL3RlbmFudGlkIjoiNWM1NDNiZDMtMjEwNi00YjQ0LWJlN2EtNzhjNmQzZDczNjk0IiwidG9rZW5fYWFkIjoiZXlKMGVYQWlPaUpLVjFRaUxDSnViMjVqWlNJNklsaExVRFp1Ums4eWNsRnFSRmRyYVY5TmNuTkliamRvVG5aVVQyOUZjRVpKUjJWMFRFWmFOSFp6VVdNaUxDSmhiR2NpT2lKU1V6STFOaUlzSW5nMWRDSTZJbE56V25OQ1RtaGFZMFl6VVRsVE5IUnljRkZDVkVKNVRsSlNTU0lzSW10cFpDSTZJbE56V25OQ1RtaGFZMFl6VVRsVE5IUnljRkZDVkVKNVRsSlNTU0o5LmV5SmhkV1FpT2lKb2RIUndjem92TDJkeVlYQm9MbTFwWTNKdmMyOW1kQzVqYjIwaUxDSnBjM01pT2lKb2RIUndjem92TDNOMGN5NTNhVzVrYjNkekxtNWxkQzgxWXpVME0ySmtNeTB5TVRBMkxUUmlORFF0WW1VM1lTMDNPR00yWkROa056TTJPVFF2SWl3aWFXRjBJam94TlRreE9ERTFOelEwTENKdVltWWlPakUxT1RFNE1UVTNORFFzSW1WNGNDSTZNVFU1TVRneE9UWTBOQ3dpWVdOamRDSTZNQ3dpWVdOeUlqb2lNU0lzSW1GblpVZHliM1Z3SWpvaU15SXNJbUZwYnlJNklqUXlaR2RaUzJjeVN6Y3ZkWFJtTTNGMFltZ3pWRzloZG1SRFdraG9iMk4xVEc1Rk0xcDZjekk0TDA1eGVHaGxkRXBTV1VFaUxDSmhiWElpT2xzaWNIZGtJbDBzSW1Gd2NGOWthWE53YkdGNWJtRnRaU0k2SWxkdmNtdDZaVzRnUkdWMlpXeHZjRzFsYm5RaUxDSmhjSEJwWkNJNklqY3laak0xTkRka0xXRTJNakl0TkRsa055MDVOR05tTFRneU0ySXdNamt3TURCa05DSXNJbUZ3Y0dsa1lXTnlJam9pTVNJc0ltWmhiV2xzZVY5dVlXMWxJam9pUld4VFlXdHJZU0lzSW1kcGRtVnVYMjVoYldVaU9pSlBiV0Z5SWl3aWFYQmhaR1J5SWpvaU1UQXlMalExTGpRMUxqUTJJaXdpYm1GdFpTSTZJazl0WVhJZ1JXeFRZV3RyWVNJc0ltOXBaQ0k2SW1RMFpXVXdZbUUzTFdVNFltUXRORFUzTnkwNE16WXpMV1l3TURrMVpETXlPRGhqWVNJc0luQnNZWFJtSWpvaU15SXNJbkIxYVdRaU9pSXhNREF6TWpBd01Ea3lRVEZGTlRaRUlpd2ljSGRrWDJWNGNDSTZJamd5TURZd055SXNJbkIzWkY5MWNtd2lPaUpvZEhSd2N6b3ZMM0J2Y25SaGJDNXRhV055YjNOdlpuUnZibXhwYm1VdVkyOXRMME5vWVc1blpWQmhjM04zYjNKa0xtRnpjSGdpTENKelkzQWlPaUpCYkd4VGFYUmxjeTVHZFd4c1EyOXVkSEp2YkNCQmJHeFRhWFJsY3k1TllXNWhaMlVnUVd4c1UybDBaWE11VW1WaFpDQkJiR3hUYVhSbGN5NVhjbWwwWlNCQmJtRnNlWFJwWTNNdVVtVmhaQ0JCY0hCRFlYUmhiRzluTGxKbFlXUlhjbWwwWlM1QmJHd2dRWEJ3YkdsallYUnBiMjR1VW1WaFpDNUJiR3dnUVhCd2JHbGpZWFJwYjI0dVVtVmhaRmR5YVhSbExrRnNiQ0JEWVd4bGJtUmhjbk11VW1WaFpDQkRZV3hsYm1SaGNuTXVVbVZoWkM1VGFHRnlaV1FnUTJGc1pXNWtZWEp6TGxKbFlXUlhjbWwwWlNCRFlXeGxibVJoY25NdVVtVmhaRmR5YVhSbExsTm9ZWEpsWkNCRGFHRjBMbEpsWVdRZ1EyaGhkQzVTWldGa1YzSnBkR1VnUTI5dWRHRmpkSE11VW1WaFpDQkRiMjUwWVdOMGN5NVNaV0ZrTGxOb1lYSmxaQ0JEYjI1MFlXTjBjeTVTWldGa1YzSnBkR1VnUTI5dWRHRmpkSE11VW1WaFpGZHlhWFJsTGxOb1lYSmxaQ0JFWld4bFoyRjBaV1JRWlhKdGFYTnphVzl1UjNKaGJuUXVVbVZoWkZkeWFYUmxMa0ZzYkNCRWFYSmxZM1J2Y25rdVFXTmpaWE56UVhOVmMyVnlMa0ZzYkNCRWFYSmxZM1J2Y25rdVVtVmhaQzVCYkd3Z1JHbHlaV04wYjNKNUxsSmxZV1JYY21sMFpTNUJiR3dnWlcxaGFXd2dSbUZ0YVd4NUxsSmxZV1FnUm1sc1pYTXVVbVZoWkNCR2FXeGxjeTVTWldGa0xrRnNiQ0JHYVd4bGN5NVNaV0ZrTGxObGJHVmpkR1ZrSUVacGJHVnpMbEpsWVdSWGNtbDBaU0JHYVd4bGN5NVNaV0ZrVjNKcGRHVXVRV3hzSUVacGJHVnpMbEpsWVdSWGNtbDBaUzVCY0hCR2IyeGtaWElnUm1sc1pYTXVVbVZoWkZkeWFYUmxMbE5sYkdWamRHVmtJRWR5YjNWd0xsSmxZV1F1UVd4c0lFZHliM1Z3TGxKbFlXUlhjbWwwWlM1QmJHd2dSM0p2ZFhCTlpXMWlaWEl1VW1WaFpDNUJiR3dnUjNKdmRYQk5aVzFpWlhJdVVtVmhaRmR5YVhSbExrRnNiQ0JKWkdWdWRHbDBlVkJ5YjNacFpHVnlMbEpsWVdRdVFXeHNJRWxrWlc1MGFYUjVVSEp2ZG1sa1pYSXVVbVZoWkZkeWFYUmxMa0ZzYkNCTllXbHNMbEpsWVdRZ1RXRnBiQzVTWldGa0xsTm9ZWEpsWkNCTllXbHNMbEpsWVdSQ1lYTnBZeUJOWVdsc0xsSmxZV1JYY21sMFpTQk5ZV2xzTGxKbFlXUlhjbWwwWlM1VGFHRnlaV1FnVFdGcGJDNVRaVzVrSUUxaGFXd3VVMlZ1WkM1VGFHRnlaV1FnVFdGcGJHSnZlRk5sZEhScGJtZHpMbEpsWVdRZ1RXRnBiR0p2ZUZObGRIUnBibWR6TGxKbFlXUlhjbWwwWlNCTlpXMWlaWEl1VW1WaFpDNUlhV1JrWlc0Z1RYbEdhV3hsY3k1U1pXRmtJRTE1Um1sc1pYTXVWM0pwZEdVZ1RtOTBaWE11UTNKbFlYUmxJRTV2ZEdWekxsSmxZV1FnVG05MFpYTXVVbVZoWkM1QmJHd2dUbTkwWlhNdVVtVmhaRmR5YVhSbElFNXZkR1Z6TGxKbFlXUlhjbWwwWlM1QmJHd2dUbTkwWlhNdVVtVmhaRmR5YVhSbExrTnlaV0YwWldSQ2VVRndjQ0JPYjNScFptbGpZWFJwYjI1ekxsSmxZV1JYY21sMFpTNURjbVZoZEdWa1FubEJjSEFnYjJabWJHbHVaVjloWTJObGMzTWdUMjVzYVc1bFRXVmxkR2x1WjNNdVVtVmhaQ0JQYm14cGJtVk5aV1YwYVc1bmN5NVNaV0ZrVjNKcGRHVWdiM0JsYm1sa0lFOXlaMkZ1YVhwaGRHbHZiaTVTWldGa0xrRnNiQ0JQY21kaGJtbDZZWFJwYjI0dVVtVmhaRmR5YVhSbExrRnNiQ0JQY21kRGIyNTBZV04wTGxKbFlXUXVRV3hzSUZCbGIzQnNaUzVTWldGa0lGQmxiM0JzWlM1U1pXRmtMa0ZzYkNCUWJHRmpaUzVTWldGa0lGQnNZV05sTGxKbFlXUXVRV3hzSUZCc1lXTmxMbEpsWVdRdVUyaGhjbVZrSUZCc1lXTmxMbEpsWVdSWGNtbDBaU0JRYkdGalpTNVNaV0ZrVjNKcGRHVXVRV3hzSUZCdmJHbGplUzVTWldGa0xrRnNiQ0JRY21WelpXNWpaUzVTWldGa0lGQnlaWE5sYm1ObExsSmxZV1F1UVd4c0lIQnliMlpwYkdVZ1VtVndiM0owY3k1U1pXRmtMa0ZzYkNCVFkyaGxaSFZzWlM1U1pXRmtMa0ZzYkNCVFkyaGxaSFZzWlM1U1pXRmtWM0pwZEdVdVFXeHNJRk5wZEdWekxrWjFiR3hEYjI1MGNtOXNMa0ZzYkNCVGFYUmxjeTVOWVc1aFoyVXVRV3hzSUZOcGRHVnpMbEpsWVdRdVFXeHNJRk5wZEdWekxsSmxZV1JYY21sMFpTNUJiR3dnVTJsMFpYTXVVMlZoY21Ob0xrRnNiQ0JVWVhOcmN5NVNaV0ZrSUZSaGMydHpMbEpsWVdRdVUyaGhjbVZrSUZSaGMydHpMbEpsWVdSWGNtbDBaU0JVWVhOcmN5NVNaV0ZrVjNKcGRHVXVVMmhoY21Wa0lGUmxZVzF6UVdOMGFYWnBkSGt1VW1WaFpDQlVaV0Z0YzBGamRHbDJhWFI1TGxObGJtUWdWR1ZoYlhOQmNIQXVVbVZoWkNCVVpXRnRjMEZ3Y0M1U1pXRmtWM0pwZEdVZ1ZHVnliVk4wYjNKbExsSmxZV1F1UVd4c0lGUmxjbTFUZEc5eVpTNVNaV0ZrVjNKcGRHVXVRV3hzSUZWelpYSXVSWGh3YjNKMExrRnNiQ0JWYzJWeUxrbHVkbWwwWlM1QmJHd2dWWE5sY2k1U1pXRmtJRlZ6WlhJdVVtVmhaQzVCYkd3Z1ZYTmxjaTVTWldGa1FtRnphV011UVd4c0lGVnpaWEl1VW1WaFpGZHlhWFJsSUZWelpYSXVVbVZoWkZkeWFYUmxMa0ZzYkNCVmMyVnlRV04wYVhacGRIa3VVbVZoWkZkeWFYUmxMa055WldGMFpXUkNlVUZ3Y0NCVmMyVnlUbTkwYVdacFkyRjBhVzl1TGxKbFlXUlhjbWwwWlM1RGNtVmhkR1ZrUW5sQmNIQWdWWE5sY2xScGJXVnNhVzVsUVdOMGFYWnBkSGt1VjNKcGRHVXVRM0psWVhSbFpFSjVRWEJ3SWl3aWMzVmlJam9pVVZkRk9FZHVOSFU1ZFd0c1VuZzVTVmhrUld4TFlVNW1WM0I1TmxkbFozbEtWMlJQVldSZk9FdG5VU0lzSW5SbGJtRnVkRjl5WldkcGIyNWZjMk52Y0dVaU9pSkJSaUlzSW5ScFpDSTZJalZqTlRRelltUXpMVEl4TURZdE5HSTBOQzFpWlRkaExUYzRZelprTTJRM016WTVOQ0lzSW5WdWFYRjFaVjl1WVcxbElqb2lUMjFoY2tCM2IzSnJlbVZ1TWpBeU1DNXZibTFwWTNKdmMyOW1kQzVqYjIwaUxDSjFjRzRpT2lKUGJXRnlRSGR2Y210NlpXNHlNREl3TG05dWJXbGpjbTl6YjJaMExtTnZiU0lzSW5WMGFTSTZJazR3VkhOeVgzVktVa1ZwVTNsQk5XNXlPRzVRUVVFaUxDSjJaWElpT2lJeExqQWlMQ0ozYVdSeklqcGJJall5WlRrd016azBMVFk1WmpVdE5ESXpOeTA1TVRrd0xUQXhNakUzTnpFME5XVXhNQ0pkTENKNGJYTmZkR05rZENJNk1UVTNOamsyT0RNNE0zMC5jaVNSQjVvUUFQZG5oSE9Rd2ZFNEF0ZVg1Nk9IN19lYndmUXoxYy13eUw5c3RPTFBDTXJ4WWM3V1F6VWRoby1KWHp4UDBseVAzS1pUSE54Smx3V1R0dTFFWXc3RmJHXzhhazRfa0NLZkRBNnBTOEVhRUpmTkp3R0Vhd3g4YUlNNkxseW80QzFZdndaSE1neTQzUDlDMFlfa1NSdmxWcVFsanNidTZpdk9pb1dYSk1zTE9hM0RnNlBZOU40czVNOGFxNDFIMXZSejJLTzYxWHFUQnpwUmNxdDM2N3o5SUlQZzNqRGV6dW1EWUk4bTU4TzlvdWQ1UGFyV2JQZHkwRUo3OWZMRE9KX3ZlT2lGODJ0Z2pmYnJ5MVk5QlU5aTR2VmFqTm1tMGxXWlY1RW1fLWdrTmJiN1BuQ0wyY2ZBNGRZOVpzNk12b3B3UVVMTjFsdC1peHF5NWciLCJodHRwOi8vd3d3LnNpdGVjb3JlLm5ldC9pZGVudGl0eS9jbGFpbXMvb3JpZ2luYWxJc3N1ZXIiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81YzU0M2JkMy0yMTA2LTRiNDQtYmU3YS03OGM2ZDNkNzM2OTQvIiwiaHR0cDovL3d3dy5zaXRlY29yZS5uZXQvaWRlbnRpdHkvY2xhaW1zL2lzQWRtaW4iOiJ0cnVlIiwiZW1haWwiOiJPbWFyQHdvcmt6ZW4yMDIwLm9ubWljcm9zb2Z0LmNvbSIsInJvbGUiOiJzaXRlY29yZVxcQWRtaW4iLCJzY29wZSI6WyJvcGVuaWQiLCJzaXRlY29yZS5wcm9maWxlIiwiR3JvdXBzQ29ubmVjdG9yU2NvcGUiLCJzaXRlY29yZS5wcm9maWxlLmFwaSJdLCJhbXIiOlsiZGVsZWdhdGlvbiJdfQ.V4ZSblQxcJX7Py2Yj4GLt0qzpQX7QUuF4KTWf5P7F3wdTYeqLE7rL7ywrFJc9nRJ-ZFgQYbSt3p1MGQV9opGhHjF8Gb00qkLbUqw8wxaOUCyJApZR4JinUekSqTSRXOqe2E7BpPx4QNBkcYcGQ1dbcleRnPfW1qQEIZ4sEe0fWH4BhVHag7-1NkEGZ4eH8LqdTcMyBxfS9xu3vZ5E0Bqo0SASEqStzlrvipCVJG1AYkMcqrmlFxocsKHOH6IkSCjpcoiJdINQ6WEPq1Nkzm7QKQ_T0ObxxzU0OJvzPv6rCR-r5sDdWIHZDZAkxTgoSeaLWpbQ701HlztB91BbaZG5g",
};

// const config = process.env.REACT_APP_STAGE === 'prod' ?
//   prod :
//   dev;

const API_config = dev;

export default API_config;
